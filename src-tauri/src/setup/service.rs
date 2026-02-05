use crate::{db::run_migrations, errors::IpcError};
use tauri::{ipc::Channel, AppHandle, Manager, Runtime};

#[taurpc::ipc_type]
pub struct SetupProgress {
    pub progress: u8,
    pub message: String,
}

#[taurpc::procedures(path = "setup")]
pub trait SetupProgressListener {
    async fn on_progress<R: Runtime>(
        app_handle: AppHandle<R>,
        on_event: Channel<SetupProgress>,
    ) -> Result<(), IpcError>;
}

#[derive(Clone)]
pub struct SetupProgressListenerImpl;

#[taurpc::resolvers]
impl SetupProgressListener for SetupProgressListenerImpl {
    async fn on_progress<R: Runtime>(
        self,
        app_handle: tauri::AppHandle<R>,
        on_event: Channel<SetupProgress>,
    ) -> Result<(), IpcError> {
        on_event
            .send(SetupProgress {
                progress: 100,
                message: "Inicializando...".to_string(),
            })
            .unwrap();
        on_event
            .send(SetupProgress {
                progress: 0,
                message: "Atualizando banco de dados...".to_string(),
            })
            .unwrap();
        run_migrations().await?;
        on_event
            .send(SetupProgress {
                progress: 100,
                message: "Atualizando banco de dados...".to_string(),
            })
            .unwrap();

        let _ = finish_setup(app_handle.clone()).await;
        Ok(())
    }
}

pub async fn finish_setup<R: Runtime>(app: AppHandle<R>) -> Result<(), ()> {
    // Setup is complete, we can close the splashscreen
    // and unhide the main window!
    let splash_window = app.get_webview_window("splash").unwrap();
    let main_window = app.get_webview_window("main").unwrap();
    splash_window.close().unwrap();
    main_window.show().unwrap();
    Ok(())
}

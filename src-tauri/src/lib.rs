pub mod db;
pub mod errors;
pub mod schema;
pub mod tanks;

use taurpc::Router;

use crate::tanks::{TankService, TankServiceImpl};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let ipc_handler = Router::new().merge(TankServiceImpl.into_handler());

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(ipc_handler.into_handler())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

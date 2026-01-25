pub mod collections;
pub mod collectors;
pub mod dashboard;
pub mod db;
pub mod errors;
pub mod producers;
pub mod schema;
pub mod tanks;
pub mod withdrawals;

use taurpc::Router;

use crate::collections::{CollectionService, CollectionServiceImpl};
use crate::collectors::{CollectorService, CollectorServiceImpl};
use crate::dashboard::{DashboardService, DashboardServiceImpl};
use crate::producers::{ProducerService, ProducerServiceImpl};
use crate::tanks::{TankService, TankServiceImpl};
use crate::withdrawals::{WithdrawalsService, WithdrawalsServiceImpl};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let ipc_handler = Router::new()
        .merge(TankServiceImpl.into_handler())
        .merge(ProducerServiceImpl.into_handler())
        .merge(CollectorServiceImpl.into_handler())
        .merge(CollectionServiceImpl.into_handler())
        .merge(DashboardServiceImpl.into_handler())
        .merge(WithdrawalsServiceImpl.into_handler());

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(ipc_handler.into_handler())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

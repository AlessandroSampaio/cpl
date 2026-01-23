// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;
#[tokio::main]
async fn main() {
    env::set_var("RUST_BACKTRACE", "1");
    cpl_lib::run()
}

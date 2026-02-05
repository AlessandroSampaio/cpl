use diesel::prelude::*;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use dotenvy::dotenv;
use std::env;

use crate::errors::IpcError;

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!();

pub async fn run_migrations() -> Result<(), IpcError> {
    let mut connection = establish_connection();
    match &connection.run_pending_migrations(MIGRATIONS) {
        Ok(_) => {
            println!("Migrations run successfully.");
            Ok(())
        }
        Err(e) => {
            // Handle the error (e.g., log it, alert, or exit)
            eprintln!("Failed to run migrations: {}", e);
            Err(IpcError::MigrationError(e.to_string()))
        }
    }
}

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

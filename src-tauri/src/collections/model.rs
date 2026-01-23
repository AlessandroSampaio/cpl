use crate::{errors::IpcError, schema::collections};
use bigdecimal::BigDecimal;
use diesel::prelude::*;

#[taurpc::ipc_type]
#[derive(Queryable, Selectable, Debug)]
#[diesel(table_name = collections)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Collection {
    pub id: i32,
    pub producer_id: i32,
    pub collector_id: Option<i32>,
    pub tank_id: i32,
    pub quantity: BigDecimal,
    pub date: chrono::NaiveDate,
}

#[taurpc::ipc_type]
#[derive(Insertable, Debug, AsChangeset)]
#[diesel(table_name = collections)]
pub struct NewCollection {
    pub producer_id: i32,
    pub collector_id: Option<i32>,
    pub tank_id: i32,
    pub quantity: BigDecimal,
    pub date: chrono::NaiveDate,
}

impl NewCollection {
    pub fn validate(&mut self) -> Result<(), IpcError> {
        println!("Validating collection : {:?}", self);

        Ok(())
    }
}

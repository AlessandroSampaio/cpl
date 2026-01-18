use crate::{errors::IpcError, schema::tanks};
use bigdecimal::BigDecimal;
use diesel::prelude::*;

#[taurpc::ipc_type]
#[derive(Queryable, Selectable, Debug)]
#[diesel(table_name = tanks)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Tank {
    pub id: i32,
    pub name: String,
    pub capacity: BigDecimal,
}

#[taurpc::ipc_type]
#[derive(Insertable, Debug)]
#[diesel(table_name = tanks)]
pub struct NewTank {
    pub name: String,
    pub capacity: Option<BigDecimal>,
}

impl NewTank {
    pub fn validate(&mut self) -> Result<bool, IpcError> {
        if self.capacity.is_none() {
            self.capacity = Some(BigDecimal::from(0));
        }

        Ok(true)
    }
}

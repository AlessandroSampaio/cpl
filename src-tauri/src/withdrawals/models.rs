use crate::schema::withdrawals;
use bigdecimal::BigDecimal;
use diesel::prelude::*;

#[taurpc::ipc_type]
#[derive(Queryable, Selectable, Debug)]
#[diesel(table_name = withdrawals)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Withdrawal {
    pub id: i32,
    pub tank_id: i32,
    pub quantity: BigDecimal,
    pub date: chrono::NaiveDate,
}

#[taurpc::ipc_type]
#[derive(Insertable, AsChangeset, Debug)]
#[diesel(table_name = withdrawals)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewWithdrawal {
    pub tank_id: i32,
    pub quantity: BigDecimal,
    pub date: chrono::NaiveDate,
}

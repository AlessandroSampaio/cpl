use crate::schema::producers;
use diesel::prelude::*;

#[taurpc::ipc_type]
#[derive(Queryable, Selectable, Debug)]
#[diesel(table_name = producers)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Producer {
    pub id: i32,
    pub name: String,
    pub day_shift: bool,
    pub night_shift: bool,
}

#[taurpc::ipc_type]
#[derive(Insertable, Debug)]
#[diesel(table_name = producers)]
pub struct NewProducer {
    pub name: String,
    pub day_shift: bool,
    pub night_shift: bool,
}

use crate::schema::collectors;
use diesel::prelude::*;

#[taurpc::ipc_type]
#[derive(Queryable, Selectable, Debug)]
#[diesel(table_name = collectors)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Collector {
    pub id: i32,
    pub name: String,
}

#[taurpc::ipc_type]
#[derive(Insertable, Debug, AsChangeset)]
#[diesel(table_name = collectors)]
pub struct NewCollector {
    pub name: String,
}

use crate::schema::{collections, producers};
use bigdecimal::BigDecimal;
use diesel::dsl::sum;
use diesel::helper_types::sum;
use diesel::prelude::*;

#[taurpc::ipc_type]
#[derive(Debug, Queryable, Selectable, PartialEq)]
#[diesel(table_name = producers)]
pub struct CollectionByProducer {
    pub id: i32,
    pub name: String,
    #[diesel(select_expression = sum(collections::quantity))]
    pub total: Option<BigDecimal>,
}

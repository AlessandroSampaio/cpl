use crate::db::establish_connection;
use crate::errors::IpcError;
use crate::schema::tanks::dsl::*;
use crate::tanks::model::{NewTank, Tank};
use diesel::{RunQueryDsl, SelectableHelper};

#[taurpc::procedures(path = "tanks", export_to = "../src/types/rpc.ts")]
pub trait TankService {
    async fn create_tank(new_tank: NewTank) -> Result<Tank, IpcError>;
}

#[derive(Clone)]
pub struct TankServiceImpl;

#[taurpc::resolvers]
impl TankService for TankServiceImpl {
    async fn create_tank(self, mut new_tank: NewTank) -> Result<Tank, IpcError> {
        new_tank.validate()?;

        let connection = &mut establish_connection();

        let created_tank = diesel::insert_into(tanks)
            .values(&new_tank)
            .returning(Tank::as_returning())
            .get_result(connection)?;

        Ok(created_tank)
    }
}

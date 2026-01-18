use crate::db::establish_connection;
use crate::errors::IpcError;
use crate::schema::tanks::dsl::*;
use crate::tanks::model::{NewTank, Tank};
use diesel::{RunQueryDsl, SelectableHelper};

#[taurpc::procedures(path = "tanks", export_to = "../src/types/rpc.ts")]
pub trait TankService {
    async fn create_tank(new_tank: NewTank) -> Result<Tank, IpcError>;
    async fn list_tanks() -> Result<Vec<Tank>, IpcError>;
    async fn delete_tank(tank_id: i32) -> Result<(), IpcError>;
    async fn get_tank(tank_id: i32) -> Result<Tank, IpcError>;
    async fn update_tank(tank_id: i32, updated_tank: NewTank) -> Result<Tank, IpcError>;
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

    async fn list_tanks(self) -> Result<Vec<Tank>, IpcError> {
        unimplemented!();
    }
    async fn delete_tank(self, _tank_id: i32) -> Result<(), IpcError> {
        unimplemented!();
    }
    async fn get_tank(self, _tank_id: i32) -> Result<Tank, IpcError> {
        unimplemented!();
    }
    async fn update_tank(self, _tank_id: i32, _updated_tank: NewTank) -> Result<Tank, IpcError> {
        unimplemented!();
    }
}

use crate::{
    db::establish_connection,
    errors::IpcError,
    schema::withdrawals::dsl::*,
    withdrawals::models::{NewWithdrawal, Withdrawal},
};
use diesel::{prelude::*, SelectableHelper};

#[taurpc::procedures(path = "withdrawals")]
pub trait WithdrawalsService {
    async fn create_withdrawal(new_withdrawal: NewWithdrawal) -> Result<Withdrawal, IpcError>;
}

#[derive(Debug, Clone)]
pub struct WithdrawalsServiceImpl;

#[taurpc::resolvers]
impl WithdrawalsService for WithdrawalsServiceImpl {
    async fn create_withdrawal(
        self,
        new_withdrawal: NewWithdrawal,
    ) -> Result<Withdrawal, IpcError> {
        println!("Creating withdrawal: {:?}", new_withdrawal);

        let connection = &mut establish_connection();

        let created_withdrawal = diesel::insert_into(withdrawals)
            .values(new_withdrawal)
            .returning(Withdrawal::as_returning())
            .get_result(connection)?;

        Ok(created_withdrawal)
    }
}

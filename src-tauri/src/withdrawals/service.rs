use crate::errors::IpcError;
use crate::withdrawals::models::Withdrawal;

#[taurpc::procedures(path = "withdrawals")]
pub trait WithdrawalsService {
    async fn create_withdrawal(new_withdrawal: Withdrawal) -> Result<Withdrawal, IpcError>;
}

#[derive(Debug, Clone)]
pub struct WithdrawalsServiceImpl;

#[taurpc::resolvers]
impl WithdrawalsService for WithdrawalsServiceImpl {
    async fn create_withdrawal(self, new_withdrawal: Withdrawal) -> Result<Withdrawal, IpcError> {
        // Implementation goes here
        println!("Creating withdrawal: {:?}", new_withdrawal);
        unimplemented!()
    }
}

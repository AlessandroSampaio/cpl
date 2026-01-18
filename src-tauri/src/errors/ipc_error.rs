use serde::{Serialize, Serializer};
use thiserror::Error;

#[derive(Error, Debug, specta::Type)]
#[serde(tag = "type", content = "data")]
pub enum IpcError {
    #[error(transparent)]
    DatabaseError(
        #[from]
        #[serde(skip)]
        diesel::result::Error,
    ),
    #[error("Invalid value for {0} : {1}")]
    InvalidValue(String, String),
}

impl Serialize for IpcError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(&self.to_string().as_str())
    }
}

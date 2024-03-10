DEFINE TABLE user SCHEMALESS;

DEFINE FIELD email ON user TYPE string
  ASSERT string::is::email($value);
DEFINE FIELD enterprise ON user TYPE option<string>
  ASSERT $value INSIDE ["apple", "google", "facebook", "tesla", "amazon", "microsoft"];

CREATE user:rand::uuid::v4() CONTENT {
  email: "jhondoe@google.com",
  enterprise: "google"
};
CREATE user:rand::uuid::v4() CONTENT {
  email: "janedoe@apple.com",
  enterprise: "apple",
};
CREATE user:rand::uuid::v4() CONTENT {
  email: "bozniak@email.com"
};,

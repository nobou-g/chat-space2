# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false |
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :groups_users
- has_many :messages, through: :groups_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false |

### Association
- has_many :groups_users
- has_many :users, through: :groups_users

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||

### Association
- has_many :groups_users



## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
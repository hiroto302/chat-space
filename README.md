# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false

### Association
- has_many :groups_users
- has_many :users,through: :groups_users
- has_many :message
 
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false, unique: true
|e-mail|string|null: false, unique: true
|password|string|null: false, unique: true

### Association
- has_many :groups_users
- has_many :groups,through: :groups_users
- has_many :message

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|null: false
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


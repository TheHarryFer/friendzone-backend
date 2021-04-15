-- Friendzone Database Tables --

-- Create Chat
CREATE TABLE IF NOT EXISTS Chat(
    chat_id                 VARCHAR(8)      NOT NULL,
    sender_id               VARCHAR(8)      NOT NULL,
    message                 VARCHAR(256)    NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (chat_id),
    UNIQUE      (chat_id)
    );

-- Create Category
CREATE TABLE IF NOT EXISTS Category(
    category_id             VARCHAR(4)      NOT NULL,
    category_name           VARCHAR(32)     NOT NULL,
    category_icon           VARCHAR(128)    NOT NULL,
    color_code              VARCHAR(7)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (category_id),
    UNIQUE      (category_id)
    );

-- Create Discount
CREATE TABLE IF NOT EXISTS Discount(
    discount_id             VARCHAR(8)      NOT NULL,
    name                    VARCHAR(64)     NOT NULL,
    description             VARCHAR(256)    NULL,
    discount_pic            VARCHAR(128)    NULL,
    redeem_point            INT             NOT NULL,
    limits                  INT             NOT NULL,
    period_start            BIGINT          NOT NULL,
    period_end              BIGINT          NOT NULL,
    use_within              BIGINT          NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (discount_id),
    UNIQUE      (discount_id)
    );

-- Create Event
CREATE TABLE IF NOT EXISTS Event(
    event_id                VARCHAR(8)      NOT NULL,
    host_id                 VARCHAR(8)      NOT NULL,
    approver_id             VARCHAR(8)      NOT NULL,
    title                   VARCHAR(64)     NOT NULL,
    description             VARCHAR(256)    NOT NULL,
    location                VARCHAR(128)    NOT NULL,
    event_pic               VARCHAR(128)    NULL,
    start_at                BIGINT          NOT NULL,
    end_at                  BIGINT          NOT NULL,
    max_participant         INT             NOT NULL,
    min_age                 INT             NOT NULL,
    max_age                 INT             NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (event_id),
    UNIQUE      (event_id)
    );

-- Create EventCategory
CREATE TABLE IF NOT EXISTS EventCategory(
    event_id                VARCHAR(8)      NOT NULL,
    category_id             VARCHAR(4)      NOT NULL,
    status                  BOOLEAN         NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (event_id, category_id),
    UNIQUE      (event_id, category_id)
    );

-- Create EventGender
CREATE TABLE IF NOT EXISTS EventGender(
    event_id                VARCHAR(8)      NOT NULL,
    gender_id               VARCHAR(4)      NOT NULL,
    status                  BOOLEAN         NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (event_id, gender_id),
    UNIQUE      (event_id, gender_id)
    );

-- Create EventInvited
CREATE TABLE IF NOT EXISTS EventInvited(
    event_invited_id        VARCHAR(8)      NOT NULL,
    inviter_id              VARCHAR(8)      NOT NULL,
    invitee_id              VARCHAR(8)      NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (event_invited_id),
    UNIQUE      (event_invited_id)
    );

-- Create EventModerator
CREATE TABLE IF NOT EXISTS EventModerator(
    event_moderator_id      VARCHAR(8)      NOT NULL,
    moderator_id            VARCHAR(8)      NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (event_moderator_id),
    UNIQUE      (event_moderator_id)
    );

-- Create EventParticipant
CREATE TABLE IF NOT EXISTS EventParticipant(
    event_participant_id    VARCHAR(8)      NOT NULL,
    event_id                VARCHAR(8)      NOT NULL,
    participant_id          VARCHAR(8)      NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    approved_at             BIGINT          NOT NULL,
    PRIMARY KEY (event_participant_id),
    UNIQUE      (event_participant_id)
    );

-- Create EventReview
CREATE TABLE IF NOT EXISTS EventReview(
    event_review_id         VARCHAR(8)      NOT NULL,
    reviewer_id             VARCHAR(8)      NOT NULL,
    rating                  INT             NOT NULL,
    comment                 VARCHAR(256)    NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (event_review_id),
    UNIQUE      (event_review_id)
    );

-- Create Follower
CREATE TABLE IF NOT EXISTS Follower(
    follower_id             VARCHAR(8)      NOT NULL,
    following_id            VARCHAR(8)      NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (follower_id, following_id),
    UNIQUE      (follower_id, following_id)
    );

-- Create Gender
CREATE TABLE IF NOT EXISTS Gender(
    gender_id               VARCHAR(4)      NOT NULL,
    gender_name             VARCHAR(8)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (gender_id),
    UNIQUE      (gender_id)
    );

-- Create ParticipantReview
CREATE TABLE IF NOT EXISTS ParticipantReview(
    participant_review_id   VARCHAR(8)      NOT NULL,
    reviewer_id             VARCHAR(8)      NOT NULL,
    participant_id          VARCHAR(8)      NOT NULL,
    rating                  INT             NOT NULL,
    comment                 VARCHAR(256)    NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (participant_review_id),
    UNIQUE      (participant_review_id)
    );

-- Create PointTransaction
CREATE TABLE IF NOT EXISTS PointTransaction(
    point_transaction_id    VARCHAR(8)      NOT NULL,
    participant_id          VARCHAR(8)      NOT NULL,
    user_discount_id        VARCHAR(8)      NOT NULL,
    description             VARCHAR(256)    NOT NULL,
    amount                  INT             NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (point_transaction_id),
    UNIQUE      (point_transaction_id)
    );

-- Create Role
CREATE TABLE IF NOT EXISTS Role(
    role_id                 VARCHAR(4)      NOT NULL,
    role                    VARCHAR(16)     NOT NULL,
    description             VARCHAR(256)    NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (role_id),
    UNIQUE      (role_id)
    );

-- Create ReportType
CREATE TABLE IF NOT EXISTS ReportType(
    report_type_id          VARCHAR(4)      NOT NULL,
    type_name               VARCHAR(32)     NOT NULL,
    require_event           BOOLEAN         NOT NULL,
    require_suspect         BOOLEAN         NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (report_type_id),
    UNIQUE      (report_type_id)
    );

-- Create Report
CREATE TABLE IF NOT EXISTS Report(
    report_id               VARCHAR(8)      NOT NULL,
    reporter_id             VARCHAR(8)      NOT NULL,
    report_type_id          VARCHAR(4)      NOT NULL,
    title                   VARCHAR(32)     NOT NULL,
    description             VARCHAR(256)    NOT NULL,
    event_id                VARCHAR(8)      NULL,
    suspect_id              VARCHAR(8)      NULL,
    admin_id                VARCHAR(8)      NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (report_id),
    UNIQUE      (report_id)
    );

-- Create Status
CREATE TABLE IF NOT EXISTS Status(
    status_id               VARCHAR(4)      NOT NULL,
    status_name             VARCHAR(16)     NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (status_id),
    UNIQUE      (status_id)
    );

-- Create User
CREATE TABLE IF NOT EXISTS User(
    user_id                 VARCHAR(8)      NOT NULL,
    username                VARCHAR(16)     NOT NULL,
    password                VARCHAR(64)     NOT NULL,
    email                   VARCHAR(64)     NOT NULL,
    firstname               VARCHAR(64)     NOT NULL,
    lastname                VARCHAR(64)     NOT NULL,
    birthdate               VARCHAR(8)      NOT NULL,
    gender_id               VARCHAR(4)      NOT NULL,
    phone                   VARCHAR(10)     NOT NULL,
    profile_pic             VARCHAR(128)    NULL,
    bio                     VARCHAR(150)    NULL,
    role_id                 VARCHAR(4)      NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (user_id),
    UNIQUE      (user_id, username, email, phone)
    );

-- Create UserDiscount
CREATE TABLE IF NOT EXISTS UserDiscount(
    user_discount_id        VARCHAR(8)      NOT NULL,
    user_id                 VARCHAR(8)      NOT NULL,
    discount_id             VARCHAR(8)      NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (user_discount_id),
    UNIQUE      (user_discount_id)
    );

-- Create UserCategory
CREATE TABLE IF NOT EXISTS UserCategory(
    user_id                 VARCHAR(8)      NOT NULL,
    category_id             VARCHAR(4)      NOT NULL,
    interest                BOOLEAN         NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (user_id, category_id),
    UNIQUE      (user_id, category_id)
    );

-- Create UserInterest
CREATE TABLE IF NOT EXISTS UserInterest(
    user_id                 VARCHAR(8)      NOT NULL,
    event_id                VARCHAR(8)      NOT NULL,
    interest                BOOLEAN         NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (user_id, event_id),
    UNIQUE      (user_id, event_id)
    );

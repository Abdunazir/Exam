create table currency_type (
    id serial primary key,
    name varchar(50),
    description text
);

create table status(
    id serial primary key,
    name varchar(255),
    description text
);

create table order(
    id serial primary key,
    order_unique_id uuid,
    full_name varchar(100),
    phone_number varchar(15),
    product_link varchar(255),
    summa decimal,
    currency_type_id integer,
    truck varchar(255),
    email varchar(100),
    description text,
    CONSTRAINT fk_currency
      FOREIGN KEY(currency_type_id) 
    REFERENCES currency_type(id)
    ON DELETE SET NULL
);

create table admin(
    id serial primary key,
    full_name varchar(100),
    user_name varchar(100) unique,
    hashed_password varchar(255),
    phone_number varchar(15),
    email varchar(255),
    tg_link varchar(255),
    hashed_token varchar(255),
    is_creator boolean,
    is_active boolean default true,
    description text
);

create table operation(
    id serial primary key,
    order_id integer,
    status_id integer,
    operation_date timestamp with time zone,
    admin_id integer,
    description text,
    CONSTRAINT fk_order
      FOREIGN KEY(order_id) 
    REFERENCES "order"(id)
    ON DELETE SET NULL,
    CONSTRAINT fk_status
      FOREIGN KEY(status_id) 
    REFERENCES status(id)
    ON DELETE SET NULL,
    CONSTRAINT fk_admin
      FOREIGN KEY(admin_id) 
    REFERENCES admin(id)
    ON DELETE SET NULL
);
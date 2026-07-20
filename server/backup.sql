--
-- PostgreSQL database dump
--

\restrict jpfhQuUmycjh6ZyBrVM72UEWg8QdMZcfiQzc3vbjO6LgZ4pf00oOLqBFvMmZUg5

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: contact_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.contact_status AS ENUM (
    'pending',
    'replied'
);


ALTER TYPE public.contact_status OWNER TO postgres;

--
-- Name: contact_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.contact_type AS ENUM (
    'Feedback',
    'Order Issue',
    'General Inquiry'
);


ALTER TYPE public.contact_type OWNER TO postgres;

--
-- Name: user_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_role AS ENUM (
    'admin',
    'customer'
);


ALTER TYPE public.user_role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart (
    cart_id uuid DEFAULT gen_random_uuid() NOT NULL,
    cart_user integer,
    food_item_id uuid,
    quantity integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.cart OWNER TO postgres;

--
-- Name: contacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contacts (
    c_id uuid DEFAULT gen_random_uuid() NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    phone character(10) NOT NULL,
    message character varying(500) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status public.contact_status DEFAULT 'pending'::public.contact_status NOT NULL,
    message_type public.contact_type NOT NULL,
    CONSTRAINT contacts_message_check CHECK ((char_length((message)::text) <= 500)),
    CONSTRAINT contacts_phone_check CHECK ((phone ~ '^[0-9]{10}$'::text))
);


ALTER TABLE public.contacts OWNER TO postgres;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(20),
    role public.user_role DEFAULT 'customer'::public.user_role NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customers_id_seq OWNER TO postgres;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: delivery_addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.delivery_addresses (
    d_id uuid DEFAULT gen_random_uuid() NOT NULL,
    latitude numeric(10,8) NOT NULL,
    longitude numeric(11,8) NOT NULL,
    location_url text,
    landmark character varying(255),
    receiver_name character varying(100) NOT NULL,
    receiver_phone character varying(15) NOT NULL,
    order_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.delivery_addresses OWNER TO postgres;

--
-- Name: food_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.food_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    category character varying(50) NOT NULL,
    is_available boolean DEFAULT true,
    is_vegetarian boolean DEFAULT false,
    image_url text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    sub_category character varying(100),
    CONSTRAINT food_items_price_check CHECK ((price >= (0)::numeric))
);


ALTER TABLE public.food_items OWNER TO postgres;

--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    order_id uuid NOT NULL,
    food_item_id uuid,
    quantity integer NOT NULL,
    unit_price numeric(10,2) NOT NULL,
    subtotal numeric(10,2) GENERATED ALWAYS AS (((quantity)::numeric * unit_price)) STORED,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT order_items_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    customer_id integer NOT NULL,
    total_amount numeric(10,2) NOT NULL,
    order_status character varying(20) DEFAULT 'pending'::character varying,
    payment_status character varying(20) DEFAULT 'unpaid'::character varying,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    order_type character varying(20) DEFAULT 'dine-in'::character varying,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart (cart_id, cart_user, food_item_id, quantity) FROM stdin;
18ab56ab-dbd8-4f3d-9bd8-1e191c278915	11	b1d8af6e-139b-45fa-8cef-cda9302e8de9	1
\.


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contacts (c_id, first_name, last_name, phone, message, created_at, status, message_type) FROM stdin;
a4013569-f8f4-4348-892c-bbef84e49d4c	Ram	Bahadur	9812457802	Your website is great	2026-06-04 18:48:42.55759	pending	Order Issue
7217df1a-c973-4b20-b635-f5dc6c7ea510	Sunita	Lopchan	9876542415	cool site	2026-06-04 19:22:36.629458	replied	General Inquiry
4eac5346-df51-4634-a5aa-a4250e9e025a	Sunil	Lamsal	9876563410	How do we order the food item? Is it safe?Is it home delivered?	2026-06-05 10:18:01.401612	pending	General Inquiry
dc202939-22a2-4f35-a118-69c31a0ab506	Resham	Khanal	9876543212	How to order food?	2026-06-05 21:19:12.961012	pending	General Inquiry
ddc36d9a-fa40-4a18-be9c-587aa9529ad1	Dhiraj 	Jha	9876542411	How's the food?	2026-06-15 18:09:04.152823	pending	General Inquiry
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id, first_name, last_name, email, username, password, phone, role, created_at) FROM stdin;
1	Ram	Bahadur	ram@gmail.com	ram_bdr	your_hashed_password	9800000000	customer	2026-04-16 12:25:13.247708
2	Klinton	Thapa	klinton@gmail.com	__klinton_	$2b$10$0.qnkR7pKwB6.YPPcCEOBuB6eoBnAQY2hL7vp1aH9aVICd0HRBWkC	9812324512	admin	2026-04-16 13:57:20.867802
3	Test	Tamang	test1@gmail.com	__test__	$2b$10$dnN86x/XElCVRTJlS21HKe1ozblKoGuH88GneeTTOqAfWIYcJ3E4W	9876342121	customer	2026-04-17 14:26:22.908563
4	Test5	Thapa	testthapa@gmail.com	test5__	$2b$10$U7K1MqYrWrfA.i.7IpxT/.YdZnWvhjTqw8uURQG6JqWjmKph693la	9823213475	customer	2026-05-10 15:04:32.31405
10	Pratima	Karki	pratimakarki@gmail.com	pratima__	$2b$10$05DLJ.bq1YDZ641X.uRdzOuifaPGk1C6V50JKPkRzJnkXa6qqikgK	9876352410	customer	2026-05-21 14:32:35.924503
11	Bibek	Rana	bibekrana@gmail.com	bibek__	$2b$10$cXYopEn2G/tvLiBKEugYteq4duAIW0yTFj2fif6EpzxfZgSDoKOrm	9876352410	customer	2026-05-21 21:07:56.438807
12	Clinton	Thapa	clintonthp01@gmail.com	__clintonn	$2b$10$QNZDAcPQU3r6O.eMF9ueVOJnnnC6YEufIzYBal5y874PJGEwlmK6G	9841422414	admin	2026-06-01 16:30:40.820426
13	Zoro	Luffy	zoroluffy@gmail.com	zoro__	$2b$10$b7Zro6mN4IwhaFbPz00zi.Boe.GaHaQi0GCM.QE0IKxSfuV0gUd.C	9854212101	customer	2026-06-04 13:49:13.407506
\.


--
-- Data for Name: delivery_addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.delivery_addresses (d_id, latitude, longitude, location_url, landmark, receiver_name, receiver_phone, order_id, created_at, updated_at) FROM stdin;
c9621728-d841-4537-9c43-c05aa79b1dbd	27.68197417	85.40065932	https://maps.google.com/maps?q=27.68197417437861,85.40065932306211	Near Himalayan School	Bibek	9876352410	11e30316-1db2-4a84-8716-9c8b81f82def	2026-05-29 11:20:33.183907	2026-05-29 11:20:33.183907
c287e966-fb86-4614-b5a1-fba0140a2181	27.68193095	85.40070875	https://maps.google.com/maps?q=27.681930951300338,85.40070874878846	Near himalayan school	Bibek	9876352410	66346ae4-539e-4c02-a6a4-c8116e552bf2	2026-06-02 10:15:38.162822	2026-06-02 10:15:38.162822
100da991-29fe-49bd-95c4-f9c7fe2acc74	27.68224872	85.40071271	https://maps.google.com/maps?q=27.682248717782656,85.40071270691745	Near srijana nagar	Pratima	9876352410	3faebec0-01ec-4c57-b001-e5a4c82c1359	2026-06-03 16:34:30.845038	2026-06-03 16:34:30.845038
b8577253-b904-47d7-b4ca-8c00bebcc7d0	27.68201515	85.40088251	https://maps.google.com/maps?q=27.682015151843064,85.40088251417716	Near valukhana	Zoro	9854212101	ef21db3b-a62d-4363-80c7-060e44302a19	2026-06-04 13:50:06.039632	2026-06-04 13:50:06.039632
2f29b211-e33c-4862-867e-ec4f316c881a	27.68205983	85.40064943	https://maps.google.com/maps?q=27.682059833922455,85.40064943404576	Near Duwakot	Bibek	9876352410	dcf96b7a-a111-478c-b41d-54f46fd4ce46	2026-06-05 21:21:14.614516	2026-06-05 21:21:14.614516
c1bbb327-3ddb-4220-8fd2-3f9b51d3fc31	27.68203345	85.40084531	https://maps.google.com/maps?q=27.682033451700867,85.40084531171443	Near Himalayan School	Bibek	9876352410	8d369876-6a5d-4740-bb57-a208b5c11d42	2026-06-24 19:29:09.268948	2026-06-24 19:29:09.268948
\.


--
-- Data for Name: food_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.food_items (id, name, description, price, category, is_available, is_vegetarian, image_url, created_at, updated_at, sub_category) FROM stdin;
e973e4bf-75d9-4a3a-b328-35978a846d8a	Masala Coffee	Strong black coffee infused with cardamom, cinnamon and ginger - a Nepali morning staple	120.00	drinks	t	t	https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	coffee
97159c15-d29b-4a32-bdfb-b474741286f8	Flat White	Double ristretto with silky steamed whole milk microfoam	280.00	drinks	t	t	https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	coffee
b1d8af6e-139b-45fa-8cef-cda9302e8de9	Cold Brew	18-hour cold-steeped coffee served over ice, smooth and low-acid	320.00	drinks	t	t	https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	coffee
e87caa2c-9f08-437e-bb13-46a3bbaec99b	Cappuccino	Equal thirds espresso, steamed milk and thick foam	250.00	drinks	t	t	https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	coffee
fc18f5bb-cc41-4594-80ec-6874548102a5	Nepali Chiya	Traditional milk tea boiled with tea leaves, ginger and cardamom	60.00	drinks	t	t	https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	tea
a236a236-d7a2-4be6-9f9c-40a75314f2fb	Lemon Honey Tea	Hot black tea with fresh lemon juice and wild hill honey	120.00	drinks	t	t	https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	tea
4af63721-70ee-45a3-883e-5625bcb6e69b	Matcha Latte	Ceremonial grade matcha whisked with steamed oat milk	340.00	drinks	t	t	https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	tea
0692d735-185d-4efe-ad55-4368f2c90d05	Coca-Cola	Classic chilled Coca-Cola, the most popular cold drink in Nepal	80.00	drinks	t	t	https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	juice
6f9fabaa-27b4-40eb-b9ff-b6cfbc978f79	Mountain Dew	Ice-cold Mountain Dew - the reigning street favourite across Kathmandu	80.00	drinks	t	t	https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	juice
9b468ac2-0ba4-451a-9334-7baef5af0f3e	Fresh Sugarcane Juice	Cold-pressed sugarcane with a squeeze of lime and black salt	100.00	drinks	t	t	https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	juice
08840997-7d97-4adc-bb31-08f75f5a543c	Watermelon Mint Juice	Fresh watermelon blended with mint leaves and a hint of ginger	180.00	drinks	t	t	https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	juice
fa2368f6-ab2c-4a48-b1b6-8bc2b43c8a69	Everest Beer	Nepal's most iconic lager - crisp, light and brewed in Kathmandu since 1986	350.00	drinks	t	f	https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	beer
9c0dabb8-d220-4176-be64-d18d0e41b079	Gorkha Premium Beer	Smooth golden lager with a malty finish, named after Nepal's warrior hill people	320.00	drinks	t	f	https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	beer
f65ffe59-c13a-47ca-bafc-f24d146c5cad	Buff Momo	Steamed buffalo mince dumplings with house tomato achar and jhol soup	180.00	snacks	t	f	https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	momo
2d02c774-0c77-4bf5-a84d-7bcb5f0f0caf	Chicken C-Momo	Crispy deep-fried chicken dumplings tossed in spicy chilli sauce	220.00	snacks	t	f	https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	momo
f25d407e-b0c4-49db-8e98-4092436b5c2d	Paneer Momo	Soft steamed dumplings stuffed with spiced cottage cheese and coriander	160.00	snacks	t	t	https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	momo
e70e58cf-154b-4c5a-bcd1-f3423363c578	Buff Chowmein	Stir-fried wheat noodles with buff strips, cabbage and Nepali spices	160.00	snacks	t	f	https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	chowmein
f95e25ad-1462-4731-96d4-4b3664f60ab9	Veg Chowmein	Wok-tossed noodles with seasonal vegetables, soy sauce and sesame oil	130.00	snacks	t	t	https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	chowmein
c48059ea-8f11-4f09-8a1c-2e9f24668b91	Sel Roti with Achar	Traditional Nepali ring-shaped rice bread served with tomato and radish pickle	120.00	breakfast	t	t	https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	nepali_breakfast
43e102ad-4e11-42ae-b6ca-f1a6b0f16812	Aloo Paratha	Whole wheat flatbread stuffed with spiced mashed potato, served with yoghurt	150.00	breakfast	t	t	https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	nepali_breakfast
68414134-f690-4014-81a1-57fc4374ca38	Avocado Toast	Sourdough toast with smashed avocado, poached egg, chilli flakes and microgreens	380.00	breakfast	t	t	https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	toast
83fd91aa-dbd8-4e83-a891-9be60ddce060	Eggs Benedict	Toasted brioche, Canadian bacon, poached eggs and classic hollandaise sauce	520.00	breakfast	t	f	https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	eggs
2c0c307f-1ee3-4bb4-a068-4251be23e54e	Shakshuka	Eggs poached in spiced tomato and pepper sauce, served with warm pita bread	440.00	breakfast	t	t	https://images.unsplash.com/photo-1590412200988-a436970781fa?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	eggs
c90057e7-2ee8-4ec7-8753-03dcbc0db8e1	Buff Smash Burger	Double smashed buff patty, aged cheddar, caramelised onions and secret sauce	580.00	lunch	t	f	https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	burger
504b7884-fe50-481b-9ed5-9aec68f64ffe	Crispy Chicken Burger	Buttermilk fried chicken thigh, coleslaw, pickles and sriracha mayo on a brioche bun	520.00	lunch	t	f	https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	burger
11abba63-f75c-40bf-896b-073496187db0	Veg Katsu Burger	Panko-crusted potato and pea patty, tonkatsu sauce, shredded cabbage	420.00	lunch	t	t	https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	burger
1b42a755-e9ca-4ee7-b189-0a6f7a5d089b	Truffle Mushroom Pizza	Hand-tossed sourdough base, wild mushroom blend, truffle oil and fresh mozzarella	780.00	dinner	t	t	https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	pizza
b24ee553-3178-4ed6-a03c-6358fa0d9da0	Buff Pepperoni Pizza	San Marzano tomato base, buffalo pepperoni, mozzarella and fresh basil	820.00	dinner	t	f	https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	pizza
d9be905b-c4ae-4618-af3a-c1fa9c846241	Margherita Pizza	Classic Neapolitan: San Marzano tomatoes, fior di latte and hand-torn basil	650.00	dinner	t	t	https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	pizza
28571ece-7a9c-4fbd-82fd-260214e1bf27	Dal Bhat Tarkari	The national dish - steamed rice, lentil soup, seasonal vegetable curry, papad and achar	280.00	dinner	t	t	https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	dal_bhat
5d0f2ce0-f7c3-49e5-90b8-99f99f6b68d0	Chicken Thali	Full Nepali thali with rice, lentils, chicken curry, saag, achar and papad	380.00	dinner	t	f	https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80	2026-05-25 14:14:06.427772+05:45	2026-05-25 14:14:06.427772+05:45	dal_bhat
27e74568-3732-4504-82f6-227078591732	Aloo Samosa	Crispy golden pastry filled with spiced mashed potato and peas, served with mint chutney and tamarind sauce	80.00	breakfast	t	t	https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80	2026-05-25 15:03:48.75337+05:45	2026-05-25 15:03:48.75337+05:45	nepali_breakfast
20f1fef4-a5ca-41d7-8bfd-268cc020b35f	Nepali Chiya with Biscuit	Classic ginger and cardamom milk tea paired with butter biscuits - the most beloved morning combo across Nepal	70.00	breakfast	t	t	https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80	2026-05-25 15:03:48.75337+05:45	2026-05-25 15:03:48.75337+05:45	nepali_breakfast
f5bb5262-ffca-45c8-a7ae-9db61f46a1ec	Chiura Tarkari	Beaten rice served with spiced potato curry, a boiled egg and a side of tomato pickle	150.00	breakfast	t	f	https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80	2026-05-25 15:03:48.75337+05:45	2026-05-25 15:03:48.75337+05:45	nepali_breakfast
e7a1e055-e103-4c66-a8cf-4218ed1d269f	Roti with Tarkari	Soft whole wheat flatbread served with slow-cooked seasonal vegetable curry and a dollop of homemade ghee	130.00	breakfast	t	t	https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80	2026-05-25 15:03:48.75337+05:45	2026-05-25 15:03:48.75337+05:45	nepali_breakfast
ca513076-64f6-46d4-ac4e-fd0e0c1fce19	Yomari	Steamed rice flour dumplings filled with chaku - a sweet molasses and sesame filling, traditional to Newari breakfast culture	160.00	breakfast	t	t	https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80	2026-05-25 15:03:48.75337+05:45	2026-05-25 15:03:48.75337+05:45	nepali_breakfast
493ad4d3-63f4-48db-823d-9c18739c89ea	Screenshot	This is a ss one	198.00	snacks	t	t	https://res.cloudinary.com/daixziwov/image/upload/v1783610392/restaurant_menu/sbcaswhpbpb79bkefkmz.png	2026-07-09 21:04:54.304831+05:45	2026-07-09 21:04:54.304831+05:45	\N
23d5da08-c3fb-49fb-8ba0-a6736a39bbde	Veggie	This is aveffie	190.00	breakfast	t	t	https://res.cloudinary.com/daixziwov/image/upload/v1783865444/restaurant_menu/y2nzdnbbwofysiqkswkd.png	2026-07-12 19:55:45.71059+05:45	2026-07-12 19:55:45.71059+05:45	\N
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (order_id, food_item_id, quantity, unit_price, created_at, updated_at) FROM stdin;
11e30316-1db2-4a84-8716-9c8b81f82def	b1d8af6e-139b-45fa-8cef-cda9302e8de9	1	320.00	2026-05-29 11:20:33.183907+05:45	2026-05-29 11:20:33.183907+05:45
66346ae4-539e-4c02-a6a4-c8116e552bf2	e70e58cf-154b-4c5a-bcd1-f3423363c578	1	160.00	2026-06-02 10:15:38.162822+05:45	2026-06-02 10:15:38.162822+05:45
3faebec0-01ec-4c57-b001-e5a4c82c1359	08840997-7d97-4adc-bb31-08f75f5a543c	1	180.00	2026-06-03 16:34:30.845038+05:45	2026-06-03 16:34:30.845038+05:45
3faebec0-01ec-4c57-b001-e5a4c82c1359	c48059ea-8f11-4f09-8a1c-2e9f24668b91	1	120.00	2026-06-03 16:34:30.845038+05:45	2026-06-03 16:34:30.845038+05:45
ef21db3b-a62d-4363-80c7-060e44302a19	4af63721-70ee-45a3-883e-5625bcb6e69b	1	340.00	2026-06-04 13:50:06.039632+05:45	2026-06-04 13:50:06.039632+05:45
ef21db3b-a62d-4363-80c7-060e44302a19	6f9fabaa-27b4-40eb-b9ff-b6cfbc978f79	1	80.00	2026-06-04 13:50:06.039632+05:45	2026-06-04 13:50:06.039632+05:45
dcf96b7a-a111-478c-b41d-54f46fd4ce46	f25d407e-b0c4-49db-8e98-4092436b5c2d	2	160.00	2026-06-05 21:21:14.614516+05:45	2026-06-05 21:21:14.614516+05:45
dcf96b7a-a111-478c-b41d-54f46fd4ce46	0692d735-185d-4efe-ad55-4368f2c90d05	1	80.00	2026-06-05 21:21:14.614516+05:45	2026-06-05 21:21:14.614516+05:45
8d369876-6a5d-4740-bb57-a208b5c11d42	f65ffe59-c13a-47ca-bafc-f24d146c5cad	4	180.00	2026-06-24 19:29:09.268948+05:45	2026-06-24 19:29:09.268948+05:45
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, customer_id, total_amount, order_status, payment_status, created_at, order_type, updated_at) FROM stdin;
3faebec0-01ec-4c57-b001-e5a4c82c1359	10	350.00	delivered	unpaid	2026-06-03 16:34:30.845038+05:45	dine-in	2026-06-03 18:03:36.388073+05:45
11e30316-1db2-4a84-8716-9c8b81f82def	11	370.00	cancelled	unpaid	2026-05-29 11:20:33.183907+05:45	dine-in	2026-06-04 12:45:48.883483+05:45
66346ae4-539e-4c02-a6a4-c8116e552bf2	11	210.00	delivered	unpaid	2026-06-02 10:15:38.162822+05:45	dine-in	2026-06-04 13:45:45.848653+05:45
ef21db3b-a62d-4363-80c7-060e44302a19	13	470.00	pending	unpaid	2026-06-04 13:50:06.039632+05:45	dine-in	2026-06-04 14:39:58.934875+05:45
dcf96b7a-a111-478c-b41d-54f46fd4ce46	11	450.00	delivered	unpaid	2026-06-05 21:21:14.614516+05:45	dine-in	2026-06-24 17:47:57.749723+05:45
8d369876-6a5d-4740-bb57-a208b5c11d42	11	770.00	delivered	unpaid	2026-06-24 19:29:09.268948+05:45	dine-in	2026-07-07 18:27:53.290335+05:45
\.


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_id_seq', 13, true);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (c_id);


--
-- Name: customers customers_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: customers customers_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_username_key UNIQUE (username);


--
-- Name: delivery_addresses delivery_addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_addresses
    ADD CONSTRAINT delivery_addresses_pkey PRIMARY KEY (d_id);


--
-- Name: food_items food_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_items
    ADD CONSTRAINT food_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: idx_food_available; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_food_available ON public.food_items USING btree (is_available);


--
-- Name: cart cart_cart_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_cart_user_fkey FOREIGN KEY (cart_user) REFERENCES public.customers(id);


--
-- Name: cart cart_food_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_food_item_id_fkey FOREIGN KEY (food_item_id) REFERENCES public.food_items(id);


--
-- Name: delivery_addresses fk_order; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_addresses
    ADD CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_food_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_food_item_id_fkey FOREIGN KEY (food_item_id) REFERENCES public.food_items(id) ON DELETE SET NULL;


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: orders orders_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict jpfhQuUmycjh6ZyBrVM72UEWg8QdMZcfiQzc3vbjO6LgZ4pf00oOLqBFvMmZUg5


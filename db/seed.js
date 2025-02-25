// import client
const client = require('./client.js');
const {v4: uuidv4} = require('uuid');

const {createUsers} = require('./users.js');
const {createProducts} = require('./products.js');
const{createReviews} = require('./reviews.js');

// drop tables
const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `)
  } catch(err) {
    console.log(err);
  }
}

// create tables
const createTables = async() => {
  try{
    await client.query(`
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(30) NOT NULL,
        image TEXT,
        ingredients TEXT
      );

      CREATE TABLE users(
        id UUID PRIMARY KEY,
        username VARCHAR(30) NOT NULL,
        password VARCHAR(60) NOT NULL
      );

      CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        text TEXT,
        user_id UUID REFERENCES users(id) NOT NULL,
        product_id INTEGER REFERENCES products(id) NOT NULL
      );
    `);
  } catch(err) {
    console.log(err);
  }
}


const syncAndSeed = async() => {
  // connect to db
  await client.connect();
  console.log(`CONNECTED TO THE DB`);

  // drop the table
  console.log(`DROPPING TABLES`);
  await dropTables();
  console.log(`TABLE DROPPED`);

  // create tables
  console.log('CREATING TABLES');
  await createTables();
  console.log('TABLES CREATED');

  // create data
  // users
  console.log(`CREATING USERS`);
  const userJane = await createUsers(uuidv4(),'Jane','dgssafsa');
  const userSunny = await createUsers(uuidv4(),'Sunny','hjdfbhdfk');
  const userZoe = await createUsers(uuidv4(),'Zoe','jpujpjkjlkj');
  const userMac = await createUsers(uuidv4(),'Mac','epwiowipj');
  const userPav = await createUsers(uuidv4(),'Pav','ewoinvk');
  console.log(`USERS CREATED`);

  // products
  console.log(`CREATING PRODUCTS`);
  await createProducts('resibio serum','serum','https://incidecoder-content.storage.googleapis.com/21c35774-0ffd-4945-ada5-6edd3589a0b2/products/resibio-serum/resibio-serum_front_photo_original.jpeg','prunus amygdalus dulcis oil;vitis vinifera seed oil;sclerocarya birrea seed oil;squalane;mauritia flexuosa fruit oil;borago officinalis seed oil;caprylic/​capric triglyceride;ascorbyl tetraisopalmitate;tocopherol;lavandula stoechas extract;pistacia lentiscus gum;parfum;linalool;geraniol;');
  await createProducts('bio-taches serum','serum','https://incidecoder-content.storage.googleapis.com/e122cd13-4fc8-453e-970a-47872f12a2d3/products/bio-taches-bio-taches-serum/bio-taches-bio-taches-serum_front_photo_original.jpeg','aqua;niacinamide;squalane;glycerin;sodium ascorbyl phosphate;ceteareth-20;glyceryl stearate;undecylenoyl phenylalanine;hydrogenated starch hydrolysate;tromethamine;carbomer;vitis vinifera fruit extract;phenoxyethanol;tocopheryl acetate;butylene glycol;saxifraga sarmentosa extract;xanthan gum;glycine soja oil;disodium edta;pentylene glycol;sodium metabisulfite;sodium sulfite;biosaccharide gum-1;diazolidinyl urea;scutellaria baicalensis extract;retinol;morus bombycis root extract;acacia senegal gum;tocopherol;propylene glycol alginate;');
  await createProducts('eve lom cleanser','cleanser','https://incidecoder-content.storage.googleapis.com/9cfe400f-c4bf-47bf-8972-f5b36c57f1d6/products/eve-lom-cleanser/eve-lom-cleanser_front_photo_original.jpeg','paraffinum liquidum;peg-30 lanolin;cetearyl alcohol;bis-diglyceryl polyacyladipate-2;aluminum stearate;theobroma cacao seed butter;peg-75 lanolin;phenoxyethanol;eugenia caryophyllus leaf oil;humulus lupulus oil;chamomilla recutita flower oil;eucalyptus globulus leaf oil;bht;');
  await createProducts('buttah cleanser','cleanser','https://incidecoder-content.storage.googleapis.com/0402db63-fbce-4506-b675-949f16666217/products/buttah-cleanser/buttah-cleanser_front_photo_original.jpeg','water (aqua);disodium cocoamphodiacetate;sodium lauryl sulfoacetate;disodium laureth sulfosuccinate;cocamidopropyl betaine;glycerin;lavender flower extract;panthenol;potassium sorbate;citric acid;sodium chloride;phenoxyethanol;ethylhexylglycerin;');
  await createProducts('the go glass toner','toner','https://incidecoder-content.storage.googleapis.com/77ea1455-d86a-4b3e-a8c5-5f7311d4569b/products/the-go-glass-toner/the-go-glass-toner_front_photo_original.jpeg','deionized water;rose water;allantoin;sugar cane;mandelic acid;malic acid;vitamin b3;witch hazel extract;fragrance;');
  await createProducts('superdrug simply pure toner','toner','https://incidecoder-content.storage.googleapis.com/d29f09b3-7f06-4f27-b0ae-878374377960/products/superdrug-simply-pure-superdrug-simply-pure-toner-200ml/superdrug-simply-pure-superdrug-simply-pure-toner-200ml_front_photo_original.jpeg','aqua;polysorbate 20;sorbitol;phenoxyethanol;sodium pca;allantoin;ethylhexylglycerin;boswellia serrata gum;dipropylene glycol;sodium hydroxide;citric acid;');
  await createProducts('simple kind to skin face moisturizer','moisturizer','https://incidecoder-content.storage.googleapis.com/6e458c6a-22a2-4439-a94c-968818fcf80b/products/simple-moisturizer/simple-moisturizer_front_photo_original.jpeg','water (aqua, eau);glycerin;polyglyceryl-3 methylglucose distearate;mineral oil (paraffinum liquidum, huile minerale);cetyl palmitate;dimethicone;borago officinalis seed oil;tocopheryl acetate;panthenol;cetyl alcohol;caprylyl glycol;carbomer;potassium hydroxide;pentylene glycol;bisabolol;acrylates-c10-30-alkyl-acrylate-crosspolymer;');
  await createProducts('safi daily soothing moisturizer','moisturizer','https://incidecoder-content.storage.googleapis.com/9e54d597-54bf-4483-8de3-bddd98b48560/products/safi-moisturizer/safi-moisturizer_front_photo_original.jpeg','water;paraffinum liquidum;dimethicone;ceteareth-20;hydroxyacetophenone;acrylates/​c10-30 alkyl acrylate crosspolymer;sodium hydroxide;nigella sativa (habbatus sauda) seed oil;aloe barbadensis (organic aloe vera) leaf extract;fragrance;phenoxyethanol;');
  await createProducts('venusia squalane aloe vera and vitamin e acetate cream','moisturizer','https://incidecoder-content.storage.googleapis.com/246c8c6e-01b4-497a-9ec6-ed70c35c8289/products/venusia-moisturizer/venusia-moisturizer_front_photo_original.jpeg"','aloe vera;propylene glycol;squalene;glycerin;cyclomethicone;stearic acid;vitamin e acetate;cetyl alcohol;dimethicone (10 cst);sodium methylparaben;trolamine;disodium edta;fragrance (al 012982);sodium propylparaben;butylated hydroxy anisole;purified water;');
  await createProducts('zeroid pimprove moisturizer','moisturizer','https://incidecoder-content.storage.googleapis.com/990dbbd4-a58d-4a8a-8b3a-b54cce595a37/products/zeroid-pimprove-moisturizer/zeroid-pimprove-moisturizer_front_photo_original.jpeg','water/​aqua;glycerin;caprylic/​capric triglyceride;1,2-hexanediol;myristoyl/​palmitoyl oxostearamide/​arachamide mea;phytosterols;stearic acid;oleamide mea;methylbenzyl methylbenzimidazole piperidinylmethanone;tocopherol;polyglyceryl-10 distearate;beta-glucan;sodium hyaluronate;allantoin;sodium polyacrylate;carbomer;arginine;');
  await createProducts('mimitika face sunscreen','sunscreen','https://incidecoder-content.storage.googleapis.com/b0e9e994-4fcd-43a6-bf42-84332181f514/products/mimitika-face-sunscreen/mimitika-face-sunscreen_front_photo_original.jpeg','aqua (water);cyclopentasiloxane;ethylhexyl methoxycinnamate;dimethicone;fragrance;ethylhexyl triazone;butyl methoxydibenzoylmethane;glycerin;ethylhexyl stearate;behenyl alcohol;undaria pinnatifida extract;hydrolyzed algin;magnesium sulfate;manganese sulfate;helianthus annuus (sunflower) seed oil;sodium stearoyl glutamate;silica;glyceryl stearate;sodium polyacrylate;sodium acrylate/​sodium acryloyldimethyl taurate copolymer;isohexadecane;polysorbate 80;sorbitan oleate;bht;dehydroacetic acid;benzyl alcohol;tocopherol;beta-sitosterol;squalene;');
  await createProducts('umbrella gel sunscreen','sunscreen','https://incidecoder-content.storage.googleapis.com/03dfce48-befc-403c-94a5-1a8313052c35/products/umbrella-gel-sunscreen/umbrella-gel-sunscreen_front_photo_original.jpeg','zinc oxide;ethylhexyl methoxycinnamate;benzophenone-3;4-methylbenzylidene camphor;methylparaben;propylparaben;');
  console.log(`PRODUCTS CREATED`);

  // reviews
  console.log(`CREATING REVIEWS`)
  console.log(userJane);
  await createReviews('Great Product!!',userJane.id,2);
  await createReviews( 'Love it sooooo much',userSunny.id, 5);
  await createReviews('Bought it last week, fast shipping!',userMac.id,1);
  await createReviews( 'Like the smell!',userZoe.id,1);
  await createReviews( 'Strongly Recommended!!',userPav.id,7);
  
  console.log(`REVIEWS CREATED`);


  // disconnect to db
  await client.end();
  console.log(`DISCONNECTED TO THE DB`);
}

syncAndSeed();
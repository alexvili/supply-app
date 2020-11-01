const router = require("express").Router();
let storeDB = require("../db");
let StoreValidation = require("../validation/StoreValidation");

const getRandomValue = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const stockGenerator = () => {
  let val = [];
  for (let i = 0; i < 12; i++) {
    val[i] = getRandomValue(50, 150);
  }
  return val;
};

router.route("/").get((req, res) => {
  storeDB.forEach((store) => {
    if (!store.waterStockAmount) {
      store.waterStockAmount = stockGenerator();
    }
  });
  res.json(storeDB);
});

router.route("/:uid").get((req, res) => {
  const uid = req.params.uid;
  res.json(storeDB.find((store) => store.uid === uid));
});

router.route("/").post((req, res) => {
  const { store } = req.body;

  let resp = StoreValidation.validate(store);
  if (resp.error) {
    return res.status(400).send(resp.error.message);
  }

  store.waterStockAmount = stockGenerator();
  storeDB.push(store);

  res.json({ store });
});

router.route("/").delete((req, res) => {
  const { uid } = req.body;

  storeDB = storeDB.filter((store) => store.uid !== uid);

  res.send({ uid });
});

router.route("/check/name/:name").get((req, res) => {
  const name = req.params.name;
  res.json({
    exists: !!storeDB.find(
      (store) => store.name.toUpperCase() === name.toUpperCase()
    ),
  });
});

router.route("/check/uid/:uid").get((req, res) => {
  const uid = req.params.uid;
  res.json({ exists: !!storeDB.find((store) => store.uid === uid) });
});

module.exports = router;

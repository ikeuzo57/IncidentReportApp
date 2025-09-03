import appImport = require("./src/app") ;

const PORT = 3000;
appImport.app.listen(PORT, () => {
  console.log(`🚀 Incident API running on http://localhost:${PORT}`);
});



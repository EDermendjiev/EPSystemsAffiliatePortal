const fs=require("fs"),p=require("path"),d=process.argv[2],c=process.argv[3];fs.writeFileSync(d,Buffer.from(c,"base64").toString("utf8"));console.log("wrote "+p.basename(d))

const dataBaseName = "md-editor"

db = db.getSiblingDB(dataBaseName)

db.createUser({
    user: "md-burea",
    pwd: "bureapass",
    roles: [{role: "readWrite", db: "md-editor"}]
});

db.documents.insert({
    name: "entrada1",
    date: new Date (),
    content: `# title
this is a test`
})

db.documents.insert({
    name: "entrada2",
    date: new Date (),
    content: `# A bit different
- a bit?`
})
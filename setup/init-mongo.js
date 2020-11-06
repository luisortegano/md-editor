const dataBaseName = "md-editor"

db = db.getSiblingDB(dataBaseName)

db.createUser({
    user: "md-burea",
    pwd: "bureapass",
    roles: [{role: "readWrite", db: "md-editor"}]
});

db.documents.insert({
    name: "Base File",
    date: new Date (),
    content: `# title
## sub title
this is a test`
})

db.documents.insert({
    name: "Second File",
    date: new Date (),
    content: `# A little different
## sub title
this is a test`
})
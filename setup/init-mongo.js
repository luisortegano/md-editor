const dataBaseName = "md-editor"

db = db.getSiblingDB(dataBaseName)

db.createUser({
    user: "md-burea",
    pwd: "bureapass",
    roles: ["readWrite"]
});

db.documents.insert({
    name: "Base File",
    date: new Date (),
    content: `# title
    ## sub title
    this is a test
    `
})
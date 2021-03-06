module.exports = function (orm, db) {
var Person = db.define("person", {
        name      : String,
        surname   : String,
        age       : Number,
        continent : [ "Europe", "America", "Asia", "Africa", "Australia", "Antartica" ], // ENUM type
        photo     : Buffer, // BLOB/BINARY
        data      : Object // JSON encoded
    }, {
        methods: {
            fullName: function () {
                return this.name + ' ' + this.surname;
            }
        },
        validations: {
            age: orm.validators.rangeNumber(18, undefined, "under-age")
        }
    });
}

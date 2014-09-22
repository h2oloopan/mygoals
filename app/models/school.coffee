Schema = require('mongo-ember').Schema
module.exports =
	School:
		schema:
			name:
				type: String
				required: true
			info:
				type: Schema.Types.Mixed
				default: {}

		validationMessages:
			name:
				required: 'School name cannot be empty'

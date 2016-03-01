/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import nls = require('vs/nls');
import ConfigurationRegistry = require('vs/platform/configuration/common/configurationRegistry');
import Platform = require('vs/platform/platform');
import modesExtensions = require('vs/editor/common/modes/modesRegistry');

modesExtensions.registerMode({
	id: 'json',
	extensions: ['.json', '.bowerrc', '.jshintrc', '.jscsrc', '.eslintrc', '.babelrc'],
	aliases: ['JSON', 'json'],
	mimetypes: ['application/json'],
	moduleId: 'vs/languages/json/common/json',
	ctorName: 'JSONMode'
});

var configurationRegistry = <ConfigurationRegistry.IConfigurationRegistry>Platform.Registry.as(ConfigurationRegistry.Extensions.Configuration);
configurationRegistry.registerConfiguration({
	'id': 'json',
	'order': 20,
	'type': 'object',
	'title': nls.localize('jsonConfigurationTitle', "JSON configuration"),
	'properties' : {
		'json.schemas' : {
			'type': 'array',
			'description': nls.localize('jsonConfiguration.schemas', "Associate schemas to JSON files in the current project"),
			'items': {
				'type': 'object',
				'properties': {
					'url': {
						'type': 'string',
						'default': '/user.schema.json',
						'description': nls.localize('jsonConfiguration.schemaPath', "A URL to a schema or a relative path to a schema in the current directory"),
					},
					'fileMatch': {
						'type': 'array',
						'items': {
							'type': 'string',
							'default': 'MyFile.json',
							'description': nls.localize('jsonConfiguration.fileMatch', "A file pattern that can contain '*' to match against when resolving JSON files to schemas."),
						},
						'minItems': 1,
						'description': nls.localize('jsonConfiguration.fileMatches', "An array of file patterns to match against when resolving JSON files to schemas."),
					},
					'schema': {
						'type': 'object',
						'description': nls.localize('jsonConfiguration.schema', "The schema definition for the given URL. The schema only needs to be provided to avoid accesses to the schema URL."),
					},
				}
			},
			'default' : [
				{ 'fileMatch': [ '/bower.json', '/.bower.json' ], 'url': 'http://json.schemastore.org/bower' },
				{ 'fileMatch': [ '/package.json' ], 'url': 'http://json.schemastore.org/package' },
				{ 'fileMatch': [ '/project.json' ], 'url': 'http://json.schemastore.org/project' },
				{ 'fileMatch': [ '*.schema.json' ], 'url': 'http://json-schema.org/draft-04/schema#' },
				{ 'fileMatch': [ '/global.json' ], 'url': 'http://json.schemastore.org/global' },
				{ 'fileMatch': [ '/tsconfig.json'], 'url': 'http://json.schemastore.org/tsconfig' },
				{ 'fileMatch': [ '/jsconfig.json'  ], 'url': 'http://opentools.azurewebsites.net/jsconfig' },
				{ 'fileMatch': [ '/.bowerrc' ], 'url': 'http://json.schemastore.org/bowerrc' },
				{ 'fileMatch': [ '/.jshintrc' ], 'url': 'http://json.schemastore.org/jshintrc' },
				{ 'fileMatch': [ '/.jscsrc' ], 'url': 'http://json.schemastore.org/jscsrc' }
			]
		}
	}
});

/*
* Copyright (c) 2019 Software AG, Darmstadt, Germany and/or its licensors
*
* SPDX-License-Identifier: Apache-2.0
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

// a lookup can be used as well to generate dynamic input fields for an action
// the fields generated will depend on the selected "secondInput" in the action "advancedecho"

module.exports = {

	name: "get_actionrequest",

	label: "Get Action Input",
	// add input data lookup will depend on for
	// eg: if auth is oauth so add access_token inside auth object
	// you can also add other input properties which are mentioned in action/trigger
	mock_input: {
		wsdlUrl: "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL",
		service: "CountryInfoService",
		soapPort: "CountryInfoServiceSoap12",
		soapAction: "FullCountryInfo",
		auth: {}
	},
	search: false,
	execute: function (input, options, output) {
		try {
			// this action could check the WSDL and traverse the required input message to generate the required structure
			// const WSDL = require('strong-soap').soap.WSDL;
			// WSDL.open(input.wsdlUrl, options, function (err, wsdl) {
			// 	if (wsdl && wsdl.services && wsdl.services[input.service] &&
			// 		wsdl.services[input.service].ports && wsdl.services[input.service].ports[input.soapPort] &&
			// 		wsdl.services[input.service].ports[input.soapPort].binding && wsdl.services[input.service].ports[input.soapPort].binding.operations) {
			// 		let abc = wsdl.services[input.service].ports[input.soapPort].binding.operations[input.soapAction];
			// 		for (const ch of wsdl.definitions.messages[abc.input.message.$name].children) {
			// 			console.log("\t+-+- ", ch.element);
			// 		}
			// 		// return output(null, []);
			// 	} else {
			// 		return output("Error while getting input for service " + input.service);
			// 	}
			// });
			var data = {
				schema: {
					type: "object",
					title: "Dynamic Fields",
					description: "JSON object to be used as input for the service " + input.soapAction,
					minLength: 0,
					properties: {}
				}
			};
			if (input.service && input.soapPort && input.soapAction) {
				data.schema.properties["actionInput"] = {
					id: "actionInput",
					type: "string",
					minLength: 0,
					title: "Action Input",
				};
			} else {
				data.schema.properties["actionInput"] = {
					id: "actionInput",
					type: "string",
					minLength: 0,
					title: "Action Input",
				};
			}
			return output(null, {
				results: data
			});
		} catch (err) {
			return output("Error while getting ports for service " + input.service + "\n", err);
		}
	}
}
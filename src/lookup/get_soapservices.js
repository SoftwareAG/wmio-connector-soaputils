/*
* Copyright (c) 2020 Software AG, Darmstadt, Germany and/or its licensors
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

module.exports = {
	name: "get_soapservices ",

	label: "Get SOAP Services ",
	
	mock_input: {
		wsdlUrl: "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL",
		auth: {}
	},
	search: false,
	execute: function (input, options, output) {
		try {
			const WSDL = require('strong-soap').soap.WSDL;
			WSDL.open(input.wsdlUrl, options, function (err, wsdl) {
				if (wsdl && wsdl.services) {
					const theServices = Object.keys(wsdl.services).map(function (svc) {
						return {
							id: svc,
							value: svc
						};
					});
					return output(null, theServices);
				}
			});
		} catch (err) {
			return output("Error while getting the services for wsdl " + input.wsdlUrl + "\n", err);
		}
	}

}
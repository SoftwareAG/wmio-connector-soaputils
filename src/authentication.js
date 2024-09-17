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

// var request = require('request');

module.exports = {
  label : 'Connect to Basic',
  mock_input: {
		api_key: "TEST_API_KEY"
	},
  validate : function (input, output){
    // auth data will be availablein input.auth
    // TODO: add any checks needed for the given API key

    return output(null, 'API Key successfully stored...');
    // request({
    //   url: 'http://httpbin.org/basic-auth/user/passwd',
    //   auth: {
    //     user: username,
    //     pass: password,
    //     sendImmediately: false
    //   }
    // },
    // function(err, res, body){
    //   if(err){
    //     output(err, null)
    //   }
    //   if(res.statusCode == 401){
    //     output('Unauthorized')
    //   } else {
    //     output(null, 'Logged in successfull');
    //   }
    // })
  }
}
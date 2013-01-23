/**
 * The contents of this file are subject to the OpenMRS Public License
 * Version 1.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://license.openmrs.org
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 *
 * Copyright (C) OpenMRS, LLC.  All Rights Reserved.
 */
package org.openmrs.module.spike1.web.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.api.context.Context;
import org.openmrs.module.appframework.AppDescriptor;
import org.openmrs.module.appframework.api.AppFrameworkService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The main controller.
 */
@Controller
public class  Spike1ManageController {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	@RequestMapping(value = "/module/spike1/manage", method = RequestMethod.GET)
	public void manage(ModelMap model) {
		model.addAttribute("user", Context.getAuthenticatedUser());
	}

    @RequestMapping(value = "/module/spike1/appList.json", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getAppList(ModelMap model) {
        log.fatal("Getting list of apps spike1");

        AppFrameworkService appFrameworkService = Context.getService(AppFrameworkService.class);
        List<AppDescriptor> allApps = appFrameworkService.getAllApps();

        log.fatal("Fetched all apps");
        for (AppDescriptor appDescriptor : allApps) {
            log.fatal("Listing app : " + appDescriptor);
        }

        log.fatal("Patient registration app");
        AppDescriptor appById = appFrameworkService.getAppById("spike1.patientregistration");
        log.fatal("PR app : " + appById);

        Map<String, Object> response = new HashMap<String, Object>();
        response.put("apps", allApps);

        return response;
    }
}

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

import net.sourceforge.jtds.jdbc.DateTime;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.api.context.Context;
import org.openmrs.module.appframework.AppDescriptor;
import org.openmrs.module.appframework.api.AppFrameworkService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
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

    @RequestMapping(value = "/module/spike1/appcachestatic.json", method = RequestMethod.GET)
    public ResponseEntity<String> getAppCacheStatic() {
        throw new RuntimeException();
    }

    @RequestMapping(value = "/module/spike1/appcache.json", method = RequestMethod.GET)
    public ResponseEntity<String> getAppCache() throws IOException {
        log.fatal("Creating application cache");

        AppFrameworkService appFrameworkService = Context.getService(AppFrameworkService.class);
        List<AppDescriptor> allApps = appFrameworkService.getAllApps();

        String homepageUrl;
        String manifestString = "CACHE MANIFEST\n";
        for (AppDescriptor appDescriptor : allApps) {
            homepageUrl = appDescriptor.getHomepageUrl();
            String homePageDirectory = homepageUrl.substring(0, homepageUrl.lastIndexOf('/') + 1);
            homepageUrl = homePageDirectory + "manifest.appcache";
            GetMethod getMethod = new GetMethod("http://localhost:8080/" + homepageUrl);
            new HttpClient().executeMethod(getMethod);
            byte[] responseBodyByteArray = getMethod.getResponseBody();
            String res = new String(responseBodyByteArray);
            String[] cacheLines = res.split("\n");
            for(String cache : cacheLines) {
                if (cache.startsWith("CACHE")) continue;
                if (StringUtils.isBlank(cache)) continue;
                if (cache.startsWith("#")) {
                    manifestString += cache + "\n";
                    continue;
                }
                manifestString += "http://localhost:8080/" + homePageDirectory + cache + "\n";
            }
            manifestString += "\n";
        }

        // This line is only for dev mode to ensure that the files
        // are fetched again
        manifestString += "#" + getTimestampString(new Date());

        log.fatal("Manifest String : ");
        log.fatal("==========================================");
        log.fatal(manifestString);
        log.fatal("==========================================");

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(new MediaType("text", "cache-manifest"));
//        responseHeaders.set("Content-Type", "text/cache-manifest");
        return new ResponseEntity<String>(manifestString, responseHeaders, HttpStatus.OK);

//        response.setContentType("text/cache-manifest");
//        return manifestString;
    }

    public String getTimestampString(Date date) {
        return "" + date.getYear() + date.getMonth() + date.getDate() +
                date.getHours() + ( date.getMinutes() - date.getMinutes() % 2 );
    }
}

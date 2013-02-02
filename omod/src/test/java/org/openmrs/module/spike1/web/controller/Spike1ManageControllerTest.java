package org.openmrs.module.spike1.web.controller;

import org.junit.Test;

import java.util.Date;

import static org.junit.Assert.assertEquals;

public class Spike1ManageControllerTest {

    @Test
    public void verifyTimestampString() {
        String timestampString1 = new Spike1ManageController().getTimestampString(new Date(1987, 9, 13, 14, 30));
        String timestampString2 = new Spike1ManageController().getTimestampString(new Date(1987, 9, 13, 14, 31));

        assertEquals("19879131430", timestampString1);
        assertEquals(timestampString1, timestampString2);
    }
}

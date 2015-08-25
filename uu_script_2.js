var footer = '<table width="100%"><tr><td><span id="footer-links">' + '<a target="_blank" href="http://www.utah.edu/">© 2015 The University of Utah</a>' + '<a target="_blank" href="http://tlt.utah.edu/">Teaching and Learning Technologies</a>' + '<a target="_blank" href="http://uonline.utah.edu/">UOnline</a>' + '<a href="#" onclick="return false;">801.581.6112</a>' + '<a target="_blank" href="http://www.utah.edu/disclaimer/index.html">Disclaimer</a>' + '<a target="_blank" href="http://www.utah.edu/privacy/">Privacy</a>' + '</span></td>' + '<td style="text-align:right;"><a target="_blank" href="http://www.instructure.com"><img src="/images/footer-logo.png?1303834440"></a></td>' + '</tr></table>';

$('#footer').html(footer);
$('input[id="build_pseudonym_for_email"]').hide();
$('label[for="build_pseudonym_for_email"]').hide();

$('div[id="login_form"]').html('<a class="button" style="font-size: 1.3em;" href="/login">uNID Log in at The University of Utah</a><p></p><a class="button" style="font-size: 1.3em;" href="/login?canvas_login=1">Guest (non uNID) Log in</a>');

// [purpose: "to modify filmstrip icon of old version of Kaltura tool", modified_date: "August-10, 2014", modifier: "Jihoon Yoo"]
setTimeout(function(){
    $('div[aria-label="Media Gallery"] > button > i').removeClass("icon-video");
    $('div[aria-label="Embed Kaltura Media"] > button > i').removeClass("icon-video");
    $('div[aria-label="Record/Upload Media"] > button > i').removeClass("icon-video").css('background-image', 'url("/images/webcam.png")');
}, 500);

var is_updated = false;
$(document).click(function() {
    if ($('#create-users-step-1') != null) {
        $('#create-users-step-1>p').text("Type or paste a list of University of Utah IDs below.  You may use email addresses to add a user as guest if user doesn't have a Unid.");
        $('.content-box>textarea').attr('placeholder', "ex: u0000000, or nonutahuser@somemail.com");
    }
    if (document.getElementById("help-dialog") != null && !is_updated) {
        // $('.help_dialog_trigger').html($('#header .user_id').text());
        //  alert('modifying ticket form...');
        is_updated = true;
        $('label[for="error_subject"]').html('Subject <b style="font-size:75%;color:red;">*required</b>');
        $('label[for="error-comments"]').html('Description <b style="font-size:75%;color:red;">**required</b>');

        var form = $('#create_ticket');
        form.append('<input type="hidden" name="user_id" value="' + $('#header .user_id').text() + '">');
        form.append('<input type="reset" value="Reset" style="display:none">');
        form.removeAttr('action');
        form.unbind('submit');
        form.bind('submit', function(e) {
            e.preventDefault();
            var subject = $('input[name="error[subject]"]').val().trim();
            var comment = $('textarea[name="error[comments]"]').val().trim();

            if (subject.length == 0) alert('Please provide a subject.');
            else if (comment.length == 0) alert('Please provide a description.');
            else {
                $.post('https://examservices.utah.edu/zendesk/feedback/add', form.serialize());
                setTimeout(function() {
                    alert("A ticket has been submitted to TLT.\n\nThank you for your time.");
                    $('input[type="reset"]').click();
                    $('.ui-dialog-titlebar-close').click();
                }, 1000);
            }
            return false;
        });
    }
    setTimeout(function(){ setKalturaIcon() }, 1004);
});

/*jslint browser: true, sloppy: false, eqeq: false, vars: false, maxerr: 50, indent: 4, plusplus: true */
/*global $, jQuery, alert, console, tinyMCE */

// These tools were designed to facilitate rapid course development in the Canvas LMS
// Copyright (C) 2014  Kenneth Larsen - Center for Innovative Design and Instruction
// Utah State University

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// http://www.gnu.org/licenses/agpl-3.0.html

////////////////////////////////////////////////////
// KENNETHWARE CONFIG                             //
////////////////////////////////////////////////////

// Development version will be loaded in the following courses
var iframeID,
    // Path to where the canvasCustomTools folder is located
    klToolsPath = 'https://examservices.utah.edu:8443/kennethware2/',
    // Path to the tools_variables file
    klToolsVariablesFile = klToolsPath + 'js/tools_variables.js',
    // Path to additional_customization file
    klToolsAdditionalCustomizationFile = klToolsPath + 'js/additional_customization.js',
    // To utilize the features that pull from the Canvas api you will need the hosted php files put their path here
    klApiToolsPath = klToolsPath + 'api/',
    // Path to institutional css file
    klGlobalCSSFile = 'https://examservices.utah.edu/canvas/uofu_overrides.css',
    klFontAwesomePath = '//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css',
    coursenum;

function klGetCourseNum() {
    'use strict';
    var matches, killspot;
    // Parse Course Number - It is stored in the variable "coursenum"
    coursenum = null;
    matches = location.pathname.match(/\/courses\/(.*)/);
    if (matches) {
        coursenum = matches[1];
        killspot = coursenum.indexOf("/", 0);
        if (killspot >= 0) {
            coursenum = coursenum.slice(0, killspot);
        }
    }
}
klGetCourseNum();


// Pull in custom variables
$.getScript(klToolsVariablesFile, function () {
    'use strict';
    console.log("tools_variables.js loaded");
    // Additional Customization
    $.getScript(klToolsAdditionalCustomizationFile, function () {
        console.log("additional_customization.js loaded");
        // Run code to initialize tools
        $.getScript(klToolsPath + "js/master_controls.js", function () {
            console.log("master_controls.js loaded");
        });
    });
});

////////////////////////////////////////////////////
// END KENNETHWARE CONFIG                         //
////////////////////////////////////////////////////

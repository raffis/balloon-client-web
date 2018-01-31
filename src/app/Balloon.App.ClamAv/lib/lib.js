/**
 * balloon
 *
 * @copyright   Copryright (c) 2012-2018 gyselroth GmbH (https://gyselroth.com)
 * @license     GPL-3.0 https://opensource.org/licenses/GPL-3.0
 */

import $ from "jquery";
import kendoWindow from 'kendo-ui-core/js/kendo.window.js';
import i18next from 'i18next';
import css from '../styles/style.css';

var app = {
  render: function(core) {
    this.balloon = core;
  },

  init: function()  {
    $('#fs-browser-tree').data('kendoTreeView').bind("select", this.selectNode);
  },

  resetView: function() {
    $('#fs-clamav').remove();
  },

  selectNode: function() {
    app.resetView();
    if(app.balloon.last.directory) {
      return;
    }

    if(app.balloon.last.malware_quarantine === true) {
      var $node = $('<div id="fs-clamav" class="fs-clamav-positive">'
          +'<span>'+i18next.t('app.balloon_app_clamav.malware_found', app.balloon.last.malware_reason)+'</span>'
        +'</li>');

      $('#fs-properties').prepend($node);
    } else if(app.balloon.last.malware_quarantine === false) {
      var $node = $('<div id="fs-clamav" class="fs-clamav-negative">'
          +'<span>'+i18next.t('app.balloon_app_clamav.clean')+'</span>'
        +'</li>');

      $('#fs-properties').prepend($node);
    }

  },
}

export default app;

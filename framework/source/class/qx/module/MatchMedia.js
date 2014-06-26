/* ************************************************************************

 qooxdoo - the new era of web development

 http://qooxdoo.org

 Copyright:
 2013 1&1 Internet AG, Germany, http://www.1und1.de

 License:
 LGPL: http://www.gnu.org/licenses/lgpl.html
 EPL: http://www.eclipse.org/org/documents/epl-v10.php
 See the LICENSE file in the project's top-level directory for details.

 Authors:
 * Romeo Kenfack Tsakem (rkenfack)
 * Tobias Oberrauch (toberrauch)

 ************************************************************************ */

/**
 * Module for mediaqueries evaluation. The module is a wrapper for media.match.js,
 * that implements a polyfill for window.matchMedia when it's not supported natively.
 */
qx.Bootstrap.define("qx.module.MatchMedia", {

  statics: {
    /**
     * Evaluates the specified mediaquery list
     *
     * @param query {String} the media query to evaluate
     * @param ctxWindow {Object?window} the window object which should be operated on
     * @attachStatic {qxWeb, matchMedia}
     * @return {qx.bom.MediaQuery}  The media query
     */
    matchMedia: function (query, ctxWindow) {
      return new qx.bom.MediaQuery(query, ctxWindow);
    },

    /**
     * Adds pre-defined media queries
     *
     * @attachStatic {qxWeb}
     */
    addSizeClasses: function () {
      qxWeb("html").mediaQueryToClass("only screen", "small-up");
      qxWeb("html").mediaQueryToClass("only screen and (max-width: 40em)", "small-only");

      qxWeb("html").mediaQueryToClass("only screen and (min-width: 40.063em)", "medium-up");
      qxWeb("html").mediaQueryToClass("only screen and (min-width: 40.063em) and (max-width: 64em)", "medium-only");

      qxWeb("html").mediaQueryToClass("only screen and (min-width: 64.063em)", "large-up");
      qxWeb("html").mediaQueryToClass("only screen and (min-width: 64.063em) and (max-width: 90em)", "large-only");

      qxWeb("html").mediaQueryToClass("only screen and (min-width: 90.063em)", "xlarge-up");
      qxWeb("html").mediaQueryToClass("only screen and (min-width: 90.063em) and (max-width: 120em)", "xlarge-only");

      qxWeb("html").mediaQueryToClass("only screen and (min-width: 120.063em)", "xxlarge-up");
    },

    /**
     * Adds or removes a class depending on matching a given media query
     *
     * @param query {String} the media query to evaluate
     * @param className {String} css class name that gets bind to an element
     *
     * @private
     */
    __applyClass: function (query, className) {
      if (query.isMatching()) {
        this.addClass(className);
      } else {
        this.removeClass(className);
      }
    },

    /**
     * Maps a class to a html element  media query
     *
     * @param queryString {String} the media query to evaluate
     * @param className {String} css class name that gets bind to an element
     * @param contextWindow {Object?window} the window object which should be operated on
     *
     * @attach {qxWeb}
     *
     * @return {qx.module.MatchMedia} The own instance
     */
    mediaQueryToClass: function (queryString, className, contextWindow) {
      var query = qx.module.MatchMedia.matchMedia(queryString, contextWindow);
      var callback = qx.module.MatchMedia.__applyClass.bind(this, query, className);

      // apply classes initially
      callback(query, className);

      query.on("change", callback);

      return this;
    }
  },

  defer: function (statics) {
    qxWeb.$attachStatic({
      matchMedia: statics.matchMedia,
      addSizeClasses: statics.addSizeClasses
    });
    qxWeb.$attach({
      mediaQueryToClass: statics.mediaQueryToClass
    });
  }
});

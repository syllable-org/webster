/*
 * Copyright (C) 2007 Apple Inc.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1.  Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 * 2.  Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 * 3.  Neither the name of Apple Computer, Inc. ("Apple") nor the names of
 *     its contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE AND ITS CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL APPLE OR ITS CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

WebInspector.PropertiesSection = function(title, subtitle)
{
    this.element = document.createElement("div");
    this.element.className = "section";

    this.headerElement = document.createElement("div");
    this.headerElement.className = "header";

    this.titleElement = document.createElement("div");
    this.titleElement.className = "title";

    this.subtitleElement = document.createElement("div");
    this.subtitleElement.className = "subtitle";

    this.headerElement.appendChild(this.titleElement);
    this.headerElement.appendChild(this.subtitleElement);
    this.headerElement.addEventListener("click", this.toggleExpanded.bind(this), false);

    this.propertiesElement = document.createElement("ol");
    this.propertiesElement.className = "properties";
    this.propertiesTreeOutline = new TreeOutline(this.propertiesElement);
    this.propertiesTreeOutline.section = this;

    this.element.appendChild(this.headerElement);
    this.element.appendChild(this.propertiesElement);

    this.title = title;
    this.subtitle = subtitle;
    this.expanded = false;
}

WebInspector.PropertiesSection.prototype = {
    get title()
    {
        return this._title;
    },

    set title(x)
    {
        if (this._title === x)
            return;
        this._title = x;
        this.titleElement.textContent = x;
    },

    get subtitle()
    {
        return this._subtitle;
    },

    set subtitle(x)
    {
        if (this._subtitle === x)
            return;
        this._subtitle = x;
        this.subtitleElement.innerHTML = x;
    },

    get expanded()
    {
        return this._expanded;
    },

    set expanded(x)
    {
        if (x)
            this.expand();
        else
            this.collapse();
    },

    get populated()
    {
        return this._populated;
    },

    set populated(x)
    {
        this._populated = x;
        if (!x && this.onpopulate && this._expanded) {
            this.onpopulate(this);
            this._populated = true;
        }
    },

    expand: function()
    {
        if (this._expanded)
            return;
        this._expanded = true;
        this.element.addStyleClass("expanded");

        if (!this._populated && this.onpopulate) {
            this.onpopulate(this);
            this._populated = true;
        }
    },

    collapse: function()
    {
        if (!this._expanded)
            return;
        this._expanded = false;
        this.element.removeStyleClass("expanded");
    },

    toggleExpanded: function()
    {
        this.expanded = !this.expanded;
    }
}

/*
 * Copyright (C) 2007 Apple Inc.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE COMPUTER, INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE COMPUTER, INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

#ifndef ClipboardUtilitiesWin_h
#define ClipboardUtilitiesWin_h

#include "DragData.h"
#include <windows.h>

namespace WebCore {

class CString;
class DeprecatedCString;
class Document;
class KURL;
class String;

HGLOBAL createGlobalData(String str);
HGLOBAL createGlobalData(CString str);
HGLOBAL createGlobalData(const KURL& url, const String& title);

FORMATETC* urlWFormat();
FORMATETC* urlFormat();
FORMATETC* plainTextWFormat();
FORMATETC* plainTextFormat();
FORMATETC* filenameWFormat();
FORMATETC* filenameFormat();
FORMATETC* htmlFormat();
FORMATETC* cfHDropFormat();
FORMATETC* smartPasteFormat();

DeprecatedCString markupToCF_HTML(const String& markup, const String& srcURL);
String urlToMarkup(const KURL& url, const String& title);

void replaceNewlinesWithWindowsStyleNewlines(String& str);
void replaceNBSPWithSpace(String& str);

bool containsFilenames(const IDataObject*);
bool containsHTML(IDataObject* data);

PassRefPtr<DocumentFragment> fragmentFromFilenames(Document*, const IDataObject*);
PassRefPtr<DocumentFragment> fragmentFromHTML(Document* doc, IDataObject* data);
PassRefPtr<DocumentFragment> fragmentFromCF_HTML(Document* doc, const String& cf_html);

String getURL(IDataObject* dataObject, bool& success, String* title = 0);
String getPlainText(IDataObject* dataObject, bool& success);

} // namespace WebCore

#endif // ClipboardUtilitiesWin_h
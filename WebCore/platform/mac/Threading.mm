/*
 * Copyright (C) 2007, 2008 Apple Inc. All rights reserved.
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
 
#import "config.h"
#import "Threading.h"

@interface WebCoreFunctionWrapper : NSObject {
    WebCore::MainThreadFunction* m_function;
    void* m_context;
}
- (id)initWithFunction:(WebCore::MainThreadFunction*)function context:(void*)context;
- (void)invoke;
@end

@implementation WebCoreFunctionWrapper

- (id)initWithFunction:(WebCore::MainThreadFunction*)function context:(void*)context;
{
    [super init];
    m_function = function;
    m_context = context;
    return self;
}

- (void)invoke
{
    m_function(m_context);
}

@end // implementation WebCoreFunctionWrapper

namespace WebCore {

void callOnMainThread(MainThreadFunction* function, void* context)
{
    WebCoreFunctionWrapper *wrapper = [[WebCoreFunctionWrapper alloc] initWithFunction:function context:context];
    [wrapper performSelectorOnMainThread:@selector(invoke) withObject:nil waitUntilDone:NO];
    [wrapper release];
}

} // namespace WebCore

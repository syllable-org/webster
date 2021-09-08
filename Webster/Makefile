include Makeconf

all: $(OBJDIR) $(BIN)

$(OBJDIR):
	mkdir $(OBJDIR) $(OBJDIR)/settings_window

$(BIN): version.h $(OBJS)
	g++ $^ -o $@ -L. -L../JavaScriptCore/objs/ -ljavascriptcore -L../WebCore/objs/ -lwebcore -L../WebView/ -lwebview -lsyllable
	strip --strip-all $(BIN)
	rescopy $(BIN) -r images/*.png
	addattrib $(BIN) os::Category Internet

version.h:
	$(shell if [ ! -e version.h ]; then \
		printf "#define WEBSTER_VERSION\t\"%s-development\"\n" `date +%Y%m%d` > version.h; \
	fi)

deps: $(OBJDIR) $(DEPS)

install:
	mkdir -p $(APPBIN)
	cp -f $(BIN) $(APPBIN)/$(BIN)

clean:
	-rm -f $(OBJS) $(OBJDIR)/* version.h $(BIN)

-include $(OBJDIR)/%.d


sass:
	node-sass --source-map ./public/stylesheets/style.css.map ./public/stylesheets/style.sass ./public/stylesheets/style.css

help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  sass                            makes sass file, requires node-sass installed globally."
	@echo "  help                            displays this help message."

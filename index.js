const Handlebars = require('handlebars'),
      match = require('minimatch'),
      fs = require('fs'),
      path = require('path');

const main = (options = {}) =>
    (files, metalsmith, done) => {
        const globals = options.globals || {},
              pattern = options.pattern || '**',
              targetExtension = options.targetExtension || 'html',
              partialsFolder = path.join(metalsmith._directory,
                                         options.partials || 'partials');

        setImmediate(done);
        registerPartials(partialsFolder);
        Object.keys(files)
            .filter(file => match(file, pattern))
            .forEach(file => {
                const template = Handlebars.compile(files[file].contents.toString()),
                      data = Object.assign( {}, globals, files[file] ),
                      filePath = path.parse(file),
                      newPath = `${filePath.dir}${filePath.dir ? '/' : '' }${filePath.name}.${targetExtension}`;

                delete files[file];
                delete data.contents;
                data.contents = template(data);
                files[newPath] = data;
            });
    };

const registerPartials = (directory) => {
    fs.readdirSync(directory)
        .forEach((file) => {
            const contents = fs.readFileSync(path.join(directory, file), 'utf-8'),
                  name = path.basename(file, '.hbs');

            Handlebars.registerPartial(name, contents);
        });
};

module.exports = main;

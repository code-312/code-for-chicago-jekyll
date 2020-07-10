// *************************************
//
//   Gulpfile
//
// *************************************
//
// Available tasks:
//   copy: bootstrap-css
//   copy: node-js-src
//   clean
//   - clean:images
//   - clean:jekyll
//   - clean:scripts
//   - clean:styles
//   build
//   - build:images
//     - build:normal-images
//       - copy:normal-temp-images-pre
//       - build:optimize-normal-images
//       - copy:normal-temp-images-post
//       - clean:normal-temp-images
//     - build:responsive-images
//   - build:index-algolia
//   - build:jekyll
//   - build:scripts
//     - build:babel-uglify
//     - build:concat
//   - build:styles:main
//   build:jekyll:watch
//   build:scripts:watch
//   build:travis
//   - test:html-proofer
//   install
//   serve
//
// *************************************

// -------------------------------------
//   Modules
// -------------------------------------
//
// autoprefixer      : Prefix CSS
// browserSync       : Development Server
// del               : Deletes things
// gulp              : The streaming build system
// pump              : Recommended to handles errors for Uglify
// gulp-babel        : Use next generation JavaScript, today, with Babel
// gulp-clean-css    : Minifies CSS
// gulp-concat       : Concatenate files
// gulp-fancy-log    : Logs things (replaced gulp-util)
// gulp-imagemin     : Minify PNG, JPEG, GIF and SVG images
// gulp-newer        : Only copy newer files
// gulp-postcss      : CSS transforms
// gulp-plumber      : Prevents pipe breaking caused by errors from gulp plugins
// gulp-rename       : Rename files
// gulp-responsive   : Generates responsive images
// gulp-run          : Run shell commands
// gulp-sass         : Compile Sass
// gulp-sourcemaps   : Generate sourcemaps
// gulp-uglify       : Minify JavaScript with UglifyJS
// gulp-util         : Utility functions
// run-sequence      : Run a series of dependent Gulp tasks in order
//
// -------------------------------------

const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const critical = require("critical").stream;
const del = require("del");
const log = require("fancy-log");
const gulp = require("gulp");
const gutil = require("gulp-util");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const pump = require("pump");
const rename = require("gulp-rename");
const responsive = require("gulp-responsive");
const run = require("gulp-run");
const runSequence = require("run-sequence");
const sass = require("gulp-ruby-sass");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");

// -------------------------------------
//   Import: paths file
// -------------------------------------

const paths = require("./_assets/gulp_config/paths");
const { doesNotMatch } = require("assert");
const { dodgerblue } = require("color-name");

// -------------------------------------
//   Global variables
// -------------------------------------

const onError = function(error) {
  gutil.beep();
  log.error(gutil.log);
};

// -------------------------------------------------------
//   Task: Copy : Bootstrap SCSS
//   copies Bootstrap SCSS from node src
//   !!! If you run this, you'll remove the commented
//   out modules in _assets/scss/bootstrap/bootstrap.scss
// -------------------------------------------------------

gulp.task("copy:bootstrap-scss", () => {
  return gulp
    .src(paths.nodeSrcDir + "bootstrap/scss/**/*")
    .pipe(newer(paths.scssFiles + "/bootstrap"))
    .pipe(gulp.dest(paths.scssFiles + "/bootstrap"));
})

// -------------------------------------
//   Task: Copy Node JS  Source
//   copies JS source files from node
// -------------------------------------

gulp.task("copy:node-js-src", () => {
  const src_files = [
    paths.nodeSrcDir + "/instantsearch.js/dist/instantsearch.min.js",
    paths.nodeSrcDir + "/jquery/dist/jquery.slim.min.js",
    paths.nodeSrcDir + "/popper.js/dist/umd/popper.min.js",
    paths.nodeSrcDir + "/bootstrap/dist/js/bootstrap.min.js",
    paths.nodeSrcDir + "/clipboard/dist/clipboard.min.js"
  ];
  return gulp
    .src(src_files)
    .pipe(newer(paths.jsFiles + "/vendor/node"))
    .pipe(gulp.dest(paths.jsFiles + "/vendor/node"));
});


// ---------------------------------------------
//   Task: Clean : Images
//   removes all images creates by build:images
//   from Jekyll and _site assets folder
// ---------------------------------------------

function cleanImages(cb) {
  return del([paths.jekyllImageFiles + "/*", paths.siteImageFiles + "/*"]);
}

// -------------------------------------
//   Task: Clean : Jekyll
//   wipes the entire _site folder
// -------------------------------------

function cleanJekyll(cb) {
  return del(["_site"]);
}

// --------------------------------------------
//   Task: Clean : Scripts
//   removes JS files created by build:scripts
//   from Jekyll and _site folders
// --------------------------------------------

function cleanScripts(cb) {
  return del([paths.jekyllJsFiles + "/*", paths.siteJsFiles + "/*"]);
}

// -----------------------------------------------
//   Task: Clean : Styles
//   removes all css created by build:styles:main
//   from Jekyll and _Site assets
// -----------------------------------------------

gulp.task("clean:styles", cb => {
  return del([paths.jekyllCssFiles + "/*", paths.siteCssFiles + "/*"]);
});

function cleanStyles(cb) {
  return del([paths.jekyllCssFiles + "/*", paths.siteCssFiles + "/*"]);
}


// -----------------------------------------
//   Task: Build Images
//   builds normal and responsive images
// -----------------------------------------

function buildImages(cb) {
  gulp.series(buildNormalImages, buildResponsiveImages, cb);
  cb();
}

// -----------------------------------------
//   Task: Build Normal Images
//   performs all normal image tasks
// -----------------------------------------

function buildNormalImages(cb) {
  gulp.series(
    copyNormalTempImagesPre,
    buildOptimizeNormalImages,
    copyNormalTempImagesPost,
    cleanNormalTempImages,
  );
  cb();
}

// -------------------------------------------------------
//   Task: Copy : Normal Temp Images Pre
//   copies images for pre-processing
//   allows for non optimized images to get copied
//   to Jekyll and _site directories when ignored
//   _assets/images/normal/temp gets deleted on end
// -------------------------------------------------------

function copyNormalTempImagesPre(cb) {
  gulp
    .src(paths.normalImageFilesGlob)
    .pipe(gulp.dest(paths.tempImageFiles));
}

// -------------------------------------------------------
//   Task: Copy : Normal Temp Images Post
//   copies temp images after processing
//   to Jekyll and _site directories
// -------------------------------------------------------

function copyNormalTempImagesPost(cb) {
  gulp
  .src(paths.tempImageFilesGlob)
  .pipe(gulp.dest(paths.jekyllImageFiles + "/normal"))
  .pipe(gulp.dest(paths.siteImageFiles + "/normal"));
  cb();
}

gulp.task("copyimages", cb => {
  gulp.src(paths.tempImageFilesGlob)
  .pipe(gulp.dest(paths.jekyllImageFiles + "/normal"))
  .pipe(gulp.dest(paths.siteImageFiles + "/normal"));
  cb();
})

// ------------------------------------------------
//   Task: Build : Optimize Normal Images
//   generates optimaized images based on
//   contents of _assets/images/normal/temp folder
//   processes files in place
// ------------------------------------------------

function buildOptimizeNormalImages(cb) {
  gulp
  .src(paths.tempImageFilesGlob)
  .pipe(
    imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ responsive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
      })
    ])
  )
  .pipe(gulp.dest(paths.tempImageFiles));
  cb();
}

// -----------------------------------------------
//   Task: Clean : Temp Normal Images
//   removes _assets/images/normal/temp directory
// -----------------------------------------------

function cleanNormalTempImages(cb) {
  returndel(paths.tempImageFiles);
}

// ----------------------------------------------
//   Task: Build : Responsive Images
//   generates responsive images based on
//   contents of _assets/images/responsive folder
//   outputs to Jekyll and _site assets folder
// ----------------------------------------------

function buildResponsiveImages(){
  return gulp
  .src(paths.responsiveImageFilesGlob)
  .pipe(
    responsive(
      {
        "*.jpg": [
          {
            width: 1140,
            rename: { suffix: "-xl-1x" }
          },
          {
            width: 1140,
            rename: {
              suffix: "-xl-1x",
              extname: ".webp"
            }
          },
          {
            width: 1140 * 2,
            rename: { suffix: "-xl-2x" }
          },
          {
            width: 1140 * 2,
            rename: {
              suffix: "-xl-2x",
              extname: ".webp"
            }
          },
          {
            width: 768,
            rename: { suffix: "-md-1x" }
          },
          {
            width: 768,
            rename: {
              suffix: "-md-1x",
              extname: ".webp"
            }
          },
          {
            width: 768 * 2,
            rename: { suffix: "-md-2x" }
          },
          {
            width: 768 * 2,
            rename: {
              suffix: "-md-2x",
              extname: ".webp"
            }
          },
          {
            width: 540,
            height: 405,
            rename: { suffix: "-sm-1x" }
          },
          {
            width: 540,
            height: 405,
            rename: {
              suffix: "-sm-1x",
              extname: ".webp"
            }
          },
          {
            width: 540 * 2,
            height: 405 * 2,
            rename: { suffix: "-sm-2x" }
          },
          {
            width: 540 * 2,
            height: 405 * 2,
            rename: {
              suffix: "-sm-2x",
              extname: ".webp"
            }
          }
        ]
      },
      {
        crop: "centre",
        quality: 60,
        responsive: true,
        withMetadata: false,
        withoutEnlargement: true
      }
    )
  )
  .pipe(gulp.dest(paths.jekyllImageFiles + "/responsive"))
  .pipe(gulp.dest(paths.siteImageFiles + "/responsive"));
}

// --------------------------------------------------
//   Task: Build : Index Algolia
//   runs 'jekyll algolia index` with ENV variable
// --------------------------------------------------

gulp.task("build:index-algolia", cb => {
  var algolia = process.env.ALGOLIA_API_KEY;
  var shellCommand = "ALGOLIA_API_KEY=" + algolia + " jekyll algolia";

  return gulp
  .src('.', {allowEmpty: true})
  .pipe(run(shellCommand))
    .on("error", gutil.log);
  cb();
});

function buildIndexAlgolia(cb) {
  var algolia = process.env.ALGOLIA_API_KEY;
  var shellCommand = "ALGOLIA_API_KEY=" + algolia + " jekyll algolia";

  return gulp
  .src('.', {allowEmpty: true})
  .pipe(run(shellCommand))
    .on("error", gutil.log);
  cb();  
}

// -------------------------------------------
//   Task: Build : Jekyll
//   runs the Jekyll build command, which
//   processes all Jekyll files and outputs
//   to the _site folder
// -------------------------------------------

function buildJekyll(cb) {
  var shellCommand = "bundle exec jekyll build --config _config.yml";

  gulp
    .src('.', {allowEmpty: true})
    .pipe(run(shellCommand))
    .on("error", gutil.log);
  cb();
}

// -------------------------------------
//   Task: Build : Scripts
//   combines babel-uglify and concat scripts
//   which are separated intentionally
//   for greater control
// -------------------------------------

function buildScripts(cb) {
  gulp.series(buildBabelUglify, buildConcat, cb);
  cb();
}

// -------------------------------------
//   Task: Build : Babel-Uglify
//   minifies JS and preserves comments
// -------------------------------------

gulp.task("build:babel-uglify", cb => {
  const options = {
    output: {
      comments: true
    }
  };
  pump(
    [
      gulp.src(paths.jsFiles + "/pretty/**/*.js"),
      babel({
        presets: ["env"]
      }),
      uglify(options),
      rename({ extname: ".min.js" }),
      gulp.dest(paths.jsFiles + "/ugly")
    ],
    cb
  );
});

function buildBabelUglify(cb) {
  const options = {
    output: {
      comments: true
    }
  };
  pump(
    [
      gulp.src(paths.jsFiles + "/pretty/**/*.js"),
      babel({
        presets: ["env"]
      }),
      uglify(options),
      rename({ extname: ".min.js" }),
      gulp.dest(paths.jsFiles + "/ugly")
    ],
    cb
  );
}

// ---------------------------------------------
//   Task: Build : Concat
//   concatenates JS files in a specific order
//   creates sourcemap
//   outputs to both Jekyll and _site assets
// ---------------------------------------------

function buildConcat() {
  const src_files = [
    paths.jsFiles + "/vendor/node/jquery.slim.min.js",
    paths.jsFiles + "/vendor/node/popper.min.js",
    paths.jsFiles + "/vendor/node/bootstrap.min.js",
    paths.jsFiles + "/vendor/node/instantsearch.min.js",
    paths.jsFiles + "/vendor/clipboard.min.js",
    paths.jsFiles + "/vendor/fontawesome.min.js",
    paths.jsFiles + "/vendor/picturefill.min.js",
    paths.jsFiles + "/ugly/algolia.min.js",
    paths.jsFiles + "/ugly/vendor/fa-brands.min.js",
    paths.jsFiles + "/ugly/vendor/fa-solid.min.js",
    // paths.jsFiles + "/ugly/vendor/sitesearch.min.js",
    // paths.jsFiles + "/ugly/search_ux.min.js",
    paths.jsFiles + "/ugly/select_source.min.js"
  ];
  return gulp
    .src(src_files)
    .pipe(sourcemaps.init())
    .pipe(concat("main.min.js"))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.jekyllJsFiles))
    .pipe(gulp.dest(paths.siteJsFiles))
    .on("error", gutil.log);
}

// -------------------------------------
//   Task: Build : Styles : Critical
//   creates a main.critical.css file
//   in Jekyll and _site assets folder
//   result doesn't render well
//   I'll probably remove this task
// -------------------------------------

function buildStylesCritical() {
  return gulp
  .src(paths.siteDir + "/index.html")
  .pipe(
    critical({
      base: paths.siteDir,
      css: [paths.jekyllCssFiles + "/main.css"],
      minify: true,
      dimensions: [
        {
          width: 1200,
          width: 1024,
          width: 768,
          width: 576,
          width: 320
        }
      ]
    })
  )
  .on("error", gutil.log)
  .pipe(rename("main.critical.css"))
  .pipe(gulp.dest(paths.jekyllCssFiles))
  .pipe(gulp.dest(paths.siteCssFiles));
}

// -------------------------------------
//   Task: Build : Styles : Main
//   generates the main.min.css file
//   and ceates sourcemap
//   in Jekyll and _site assests folders
// -------------------------------------

function buildStylesMain() {
  return sass(paths.scssFiles + "/main.scss", {
    style: "compressed",
    trace: true
  })
    .pipe(postcss([autoprefixer({ browsers: ["last 2 versions"] })]))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.jekyllCssFiles))
    .pipe(gulp.dest(paths.siteCssFiles))
    .pipe(browserSync.stream())
    .on("error", gutil.log);
}

// -------------------------------------
//   Task: Build : Jekyll : Watch
//   reloads BrowserSync on Jekyll build
// -------------------------------------'

gulp.task("build:jekyll:watch", gulp.series(buildJekyll), cb => {
  browserSync.reload();
});


// -------------------------------------
//   Task: Build : Scripts : Watch
//   reloads BrowserSync on Scripts build
// -------------------------------------

gulp.task("build:scripts:watch", gulp.series(buildScripts), cb => {
  browserSync.reload();
  cb();
});

// -----------------------------------------
//   Task: Build Travis
//   adds test:html-proofer to build
// -----------------------------------------

gulp.task("build:travis", cb => {
  runSequence(
    "clean",
    ["build:scripts", "build:images", "build:styles:main"],
    "build:jekyll",
    "test:html-proofer",
    cb
  );
  cb;
});

// ------------------------------------------------------
//   Task: Test HTML Proofer
//   runs HTML Proofer for valid links and other things
// ------------------------------------------------------

gulp.task("test:html-proofer", () => {
  var shellCommand =
    "htmlproofer ./_site --disable-external --check-opengraph --allow-hash-href";

  return gulp
    .src("")
    .pipe(run(shellCommand))
    .on("error", gutil.log);
});

// ------------------------------------------------
//   Task: Clean
//   combines all clean tasks, running in parallel
// ------------------------------------------------

let clean = gulp.series(
  cleanJekyll,
  cleanImages,
  cleanScripts,
  cleanStyles);

gulp.task('clean', 
  gulp.series(
    cleanJekyll,
    cleanImages,
    cleanScripts,
    cleanStyles)
  );

// -----------------------------------------
//   Task: Build
//   runs main Clean task first
//   then runs all Build tasks in Parallel
//   then runs Jekyll build
// -----------------------------------------

gulp.task('build', 
    gulp.series('clean',
    buildScripts,
    "copyimages",
    buildStylesMain,
    buildJekyll)
);

function build(cb) {
  return gulp.series(
    'clean',
    buildScripts,
    buildImages,
    buildStylesMain,
    buildJekyll
  );
  cb();
}

// -------------------------------------------------
//   Task: Install
//   run this only once for initiall install
//   otherwise it can be destructive to your SCSS
//   copies source code from node
//   runs jekyll serve
// -------------------------------------------------

gulp.task("install", () => {
  runSequence(["copy:bootstrap-scss", "copy:node-js-src"], "serve");
});

// -------------------------------------------------
//   Task: Serve
//   runs development server, watching for changes
// -------------------------------------------------

gulp.task("serve", gulp.series("build"), () => {
  browserSync.init({
    server: paths.siteDir,
    ghostMode: true,
    logFileChanges: true
  });

  // gulp.watch(["_config.yml",
  // "_assets/scss/**/*.scss",
  // "_assets/js/**/*.js",
  // "_assets/images/normal/**/*",
  // "search.json",
  // "_posts/**/*.+(md|markdown|MD)"], gulp.series(build))
 
  gulp.watch("_config.yml", gulp.series("build:jekyll:watch"));
  gulp.watch("_assets/scss/**/*.scss", gulp.series(buildStylesMain));
  gulp.watch("_assets/js/**/*.js", gulp.series(buildScripts));
  gulp.watch("_assets/images/normal/**/*", gulp.series(copyNormalTempImagesPost));
  gulp.watch("search.json", gulp.series("build:jekyll:watch"));
  gulp.watch("_posts/**/*.+(md|markdown|MD)", gulp.series("build:jekyll:watch"));
  gulp.watch(
    ["**/*.+(html|md|markdown|MD)", "!_site/**/*.*"],
    gulp.series("build:jekyll:watch")
  );
  if (module.exports.drafts) {
    gulp.watch("_drafts/**/*.(md|markdown|MD)", gulp.series("build:jekyll:watch"));
  }
  return
});

function analyzeNeighborhoodsByCategoryIndices() {
    var deferred = Q.defer();
    get3DplotData()
        .then(function(val) {
            deferred.resolve(val);
        });
    return deferred.promise;
}

function getSelectedVSCategories() {
    var selectedVSCategories = [];
    for (selected of $('#vs_cat_list > .btn.active')) {
        selectedVSCategories.push(selected.innerText);
    }
    return selectedVSCategories;
}

function getVSCategoryIndices(categories) {
    var deferred = Q.defer();
    d3.csv("./data/vsCatIndices_2014.csv", function(data) {
        // console.log(data);
        var vsCatIndices = {};
        for (row of data) {
            vsCatIndices[row['CSA2010']] = []
            for (category of categories) {
                vsCatIndices[row['CSA2010']].push(parseFloat(row[category]));
            }
        }
        deferred.resolve([categories, vsCatIndices]);
    });
    return deferred.promise;
}

function getEmbeddings(data) {
    var opt = {}
    opt.epsilon = 10; // epsilon is learning rate (10 = default)
    opt.perplexity = 30; // roughly how many neighbors each point influences (30 = default)
    opt.dim = 1; // dimensionality of the embedding (2 = default)

    var tsne = new tsnejs.tSNE(opt); // create a tSNE instance
    // var data = [[10.0, 0.0, 0.2], [0.1, 1.0, 0.3], [0.2, 0.0, 1.0], [1.0, 0.0, 0.2]];
    tsne.initDataRaw(data);

    for (var k = 0; k < 500; k++) {
        tsne.step(); // every time you call this, solution gets better
    }

    return tsne.getSolution(); // Y is an array of 2-D points that you can plot
    // return Y;
}

function get3DplotData() {
    var deferred = Q.defer();
    getVSCategoryIndices(getSelectedVSCategories())
        .then(function([categories, vsCatIndices]) {
            var embeddings = getEmbeddings(Object.values(vsCatIndices));

            deferred.resolve({
                'categories': categories,
                'vsCatIndices': vsCatIndices,
                'embeddings': embeddings
            });
        });
    return deferred.promise;
}


function compareNeighborhoods(neighborhoodIds, callbackFun) {
    var tableData = [];
    for (var nhood of neighborhoodIds) {
        tableData[nhood] = pageData['vsCatIndices'][nhood];
    }
    callbackFun(tableData);
}
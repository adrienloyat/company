'use strict';

/* Controllers */

function recherche($scope) {


	var url="http://api.opencorporates.com/companies/search";

    $scope.lancerLaRecherche = function(pageNum){
            var $rech=  $scope.recherche;
            var reqPage = pageNum?"&page="+pageNum:"";
            console.log( reqPage);
            $rech = $rech.trim().split(/ +/).join("+");
            console.log( $rech);
            var trueUrl = url + "?q=" + $rech + reqPage + "&callback=?"
            console.log(trueUrl);

            $.getJSON(trueUrl, function(json) {
                $scope.$apply(function(){
                    var pagination = {};
                    $scope.pagination=pagination;
                    pagination.total_pages = json.total_pages;
                    pagination.total_count = json.total_count;
                    pagination.page = json.page;
                    pagination.per_page = json.per_page;
                    paginer(pagination);

                    $scope.companies=json.companies;
                    $scope.name=($scope.companies[0]);
                    console.log($scope);
                });
            });
    }

   var paginer = function(pagination){
           pagination.pages={};
           pagination.prev=false;
           pagination.next=false;
           pagination.pages[3]=pagination.page;
           if (pagination.page>1){
               pagination.pages[2]= pagination.page-1;
               pagination.prev =pagination.pages[2];
           }
           if (pagination.page>2){
               pagination.pages[1]= pagination.page-2;
           }
           if (pagination.page<pagination.total_pages){
               pagination.pages[4]= pagination.page+1;
               pagination.next=pagination.pages[4];
           }
           if (pagination.page<pagination.total_pages-1){
               pagination.pages[5]= pagination.page+2;
           }
   }
}

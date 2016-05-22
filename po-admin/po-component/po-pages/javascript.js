oTable = $('.dTableAjax').dataTable({
	"sAjaxSource": "po-component/po-pages/datatable.php",
	"sDom": "<'row'<'col-sm-6 col-xs-5'l><'col-sm-6 col-xs-7'f>r>t<'row'<'col-sm-5 hidden-xs'i><'col-sm-7 col-xs-12 clearfix'p>>",
	"sPaginationType": "bootstrap",
	"oLanguage": {
		"sLengthMenu": "_MENU_",
			"sSearch": '<div class="input-group">_INPUT_<span class="input-group-addon"><i class="fa fa-search"></i></span></div>',
			"sInfo": "<strong>_START_</strong>-<strong>_END_</strong> of <strong>_TOTAL_</strong>",
			"oPaginate": {
				"sPrevious": "",
				"sNext": ""
			}
	},
	"bJQueryUI": false,
	"bAutoWidth": false,
	"aaSorting": [[2, "desc"]],
	"bStateSave": true,
    "fnStateSave": function (oSettings, oData) {
		localStorage.setItem('DataTables_'+window.location.pathname, JSON.stringify(oData));
	},
	"fnStateLoad": function (oSettings) {
		return JSON.parse(localStorage.getItem('DataTables_'+window.location.pathname));
	},
	"bServerSide": true,
	"iDisplayLength": 10,
		"aLengthMenu": [
			[10, 30, 50, -1],
			[10, 30, 50, "All"]
		],
	"fnDrawCallback": function( oSettings ) {
		$("#titleCheck").click(function() {
			var checkedStatus = this.checked;
			$("table tbody tr td div:first-child input[type=checkbox]").each(function() {
				this.checked = checkedStatus;
				if (checkedStatus == this.checked) {
					$(this).closest('table tbody tr').removeClass('danger');
					$(this).closest('table tbody tr').find('input:hidden').attr('disabled', !this.checked);
					$('#totaldata').val($('form input[type=checkbox]:checked').size());
				}
				if (this.checked) {
					$(this).closest('table tbody tr').addClass('danger');
					$(this).closest('table tbody tr').find('input:hidden').attr('disabled', !this.checked);
					$('#totaldata').val($('form input[type=checkbox]:checked').size());
				}
			});
		});	
		$('table tbody tr td div:first-child input[type=checkbox]').on('click', function () {
			var checkedStatus = this.checked;
			this.checked = checkedStatus;
			if (checkedStatus == this.checked) {
				$(this).closest('table tbody tr').removeClass('danger');
				$(this).closest('table tbody tr').find('input:hidden').attr('disabled', !this.checked);
				$('#totaldata').val($('form input[type=checkbox]:checked').size());
			}
			if (this.checked) {
				$(this).closest('table tbody tr').addClass('danger');
				$(this).closest('table tbody tr').find('input:hidden').attr('disabled', !this.checked);
				$('#totaldata').val($('form input[type=checkbox]:checked').size());
			}
		});
		$('table tbody tr td div:first-child input[type=checkbox]').change(function() {
			$(this).closest('tr').toggleClass("danger", this.checked);
		});
		$(".alertdel").click(function(){
			var id = $(this).attr("id");
			$('#alertdel').modal('show');
			$('#delid').val(id);
		});
	}
});

$('#title').on('input', function() {
    var permalink;
    // Trim empty space
    permalink = $.trim($(this).val());
    // replace more then 1 space with only one
    permalink = permalink.replace(/\s+/g,' ');
    $('#seotitle').val(permalink.toLowerCase());
    $('#seotitle').val($('#seotitle').val().replace(/\W/g, ' '));
    $('#seotitle').val($.trim($('#seotitle').val()));
    $('#seotitle').val($('#seotitle').val().replace(/\s+/g, '-'));
    var gappermalink = $('#seotitle').val();
    $('#permalink').html(gappermalink);
});

$('#seotitle').on('input', function() {
    var permalink;
    // Trim empty space
    permalink = $(this).val();
    // replace more then 1 space with only one
    permalink = permalink.replace(/\s+/g,' ');
    $('#seotitle').val(permalink.toLowerCase());
    $('#seotitle').val($('#seotitle').val().replace(/\W/g, ' '));
    $('#seotitle').val($('#seotitle').val().replace(/\s+/g, '-'));
    var gappermalink = $('#seotitle').val();
    $('#permalink').html(gappermalink);
});

$('.del-image').click(function () {
    var id = $(this).attr("id");
    $('#alertdelimg').modal('show');
    $('.btn-del-image').attr("id",id);
});

$('.btn-del-image').click(function () {
    var id = $(this).attr("id");
    var mod = 'pages';
    var act =  'delimage';
    var dataString = 'id='+ id + '&mod='+ mod + '&act='+ act;
    $.ajax({
        type: "POST",
        url: "po-component/po-pages/proses.php",
        data: dataString,
        cache: false,
        success: function(data){
            $('#alertdelimg').modal('hide');
            $('#image-box').hide();
        }
    });
    return false;
});

$('#tiny-text').click(function (e) {
	e.stopPropagation();
	tinymce.EditorManager.execCommand('mceRemoveEditor',true, 'po-wysiwyg');
});

$('#tiny-visual').click(function (e) {
	e.stopPropagation();
	tinymce.EditorManager.execCommand('mceAddEditor',true, 'po-wysiwyg');
});
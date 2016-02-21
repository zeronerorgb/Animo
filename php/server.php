<?php

	$korm = [
		[
			"p" => 46,
			"f" => 23,
			"c" => 10
		],
		[
			"p" => 26,
			"f" => 12,
			"c" => 42
		]
	];

	$index = $_POST['index'];
	$index = (float) $index;

	$korm = $korm[$index];

	$normal = 100;
	$eat = 200*rand(0, 10) / 10;

	$result = [];
	$result['eat'] = $eat;
	$result['feel'] = 1-(abs($normal-$eat)/100);
	$result['bar'] = [
		'p' => ($korm['p']/100)*$eat,
		'f' => ($korm['f']/100)*$eat,
		'c' => ($korm['c']/100)*$eat,
	];

	print(json_encode($result));



?>
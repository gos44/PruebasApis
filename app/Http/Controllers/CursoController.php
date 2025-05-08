<?php

namespace App\Http\Controllers;
use App\Models\Curso;
use Illuminate\Http\Request;

class CursoController extends Controller
{
    public function index()
    {
        $cursos = Curso::all();
        return response()->json($cursos); 
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'descripcion' => 'nullable',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after:fecha_inicio',
        ]);

        $curso = Curso::create($request->all());

        return response()->json([
            'message' => 'Curso creado exitosamente.',
            'curso' => $curso
        ], 201);
    }

    public function show(Curso $curso)
    {
        return response()->json($curso);
    }

    public function update(Request $request, Curso $curso)
    {
        $request->validate([
            'nombre' => 'required',
            'descripcion' => 'nullable',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after:fecha_inicio',
        ]);

        $curso->update($request->all());

        return response()->json([
            'message' => 'Curso actualizado exitosamente.',
            'curso' => $curso
        ]);
    }

    public function destroy(Curso $curso)
    {
        $curso->delete();

        return response()->json(['message' => 'Curso eliminado exitosamente.']);
    }
}

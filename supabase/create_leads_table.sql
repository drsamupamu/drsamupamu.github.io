-- =====================================================
-- SCRIPT: Crear tabla leads_demo para RENTAPAC
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- =====================================================

-- Tabla para almacenar leads del formulario de demo
CREATE TABLE IF NOT EXISTS leads_demo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT NOT NULL,
    empresa TEXT NOT NULL,
    email TEXT NOT NULL,
    telefono TEXT NOT NULL,
    propiedades TEXT NOT NULL,
    mensaje TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    estado TEXT DEFAULT 'nuevo',
    notas TEXT
);

-- Comentario en la tabla
COMMENT ON TABLE leads_demo IS 'Leads capturados desde el formulario de solicitud de demo en la landing page';

-- Habilitar RLS
ALTER TABLE leads_demo ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT anónimo (formulario público)
CREATE POLICY "Allow anonymous insert" ON leads_demo
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Política para permitir SELECT a usuarios autenticados
CREATE POLICY "Allow authenticated read" ON leads_demo
    FOR SELECT
    TO authenticated
    USING (true);

-- Política para permitir UPDATE a usuarios autenticados  
CREATE POLICY "Allow authenticated update" ON leads_demo
    FOR UPDATE
    TO authenticated
    USING (true);

-- Índice para búsquedas por fecha
CREATE INDEX IF NOT EXISTS idx_leads_demo_created_at ON leads_demo(created_at DESC);

-- Índice para filtrar por estado
CREATE INDEX IF NOT EXISTS idx_leads_demo_estado ON leads_demo(estado);

-- =====================================================
-- Verificar que se creó correctamente
-- =====================================================
SELECT 'Tabla leads_demo creada exitosamente' as resultado;

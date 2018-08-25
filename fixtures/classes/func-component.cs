using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class FunctionalComponent 
{
  [Required]
  public string Text { get; set; }
  public bool IsSomething { get; set; }
  public int Number { get; set; }
  public int IntNumber { get; set; }
  [Required]
  public float FloatNumber { get; set; }
  public IList<string> Texts { get; set; }
  public FunctionalComponent_SingleObject SingleObject { get; set; }
  [Required]
  public IList<FunctionalComponent_ObjectsItem> Objects { get; set; }
  [Required]
  public IList<Link> ObjectArray { get; set; }
  public IList<IList<IList<string>>> NestedList { get; set; }
  public Link Link { get; set; }
  public IList<Link> LinkList { get; set; }
  public Link LinkMeta { get; set; }
  public IList<Link> LinkListMeta { get; set; }
  [Required]
  public FunctionalComponent_EnumArray EnumArray { get; set; }
  public FunctionalComponent_EnumInline EnumInline { get; set; }
  public FunctionalComponent_EnumObject EnumObject { get; set; }
}

public class FunctionalComponent_SingleObject 
{
  [Required]
  public string PropertyA { get; set; }
}

public class FunctionalComponent_ObjectsItem 
{
  [Required]
  public string PropertyB { get; set; }
}

public enum FunctionalComponent_EnumArray 
{
  [Display(Name = "value-1")]
  Value1 = 0,
  [Display(Name = "value-2")]
  Value2 = 1,
}

public enum FunctionalComponent_EnumInline 
{
  None = 0,
  FunctionalComponentEnumInline1 = 1,
  FunctionalComponentEnumInline2 = 2,
}

public enum FunctionalComponent_EnumObject 
{
  None = 0,
  [Display(Name = "valueA")]
  ValueA = 1,
  [Display(Name = "valueB")]
  ValueB = 2,
}